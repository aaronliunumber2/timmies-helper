import React, { Component } from 'react'
import PlayerLists from './PlayerLists'
import teamData from './data/teams.json'
import playerNames from './data/playerNames.json'
import axios from 'axios'

class TimmiesApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            playerLists: [{ id: "1", players: [] }, { id: "2", players: [] }, { id: "3", players: [] }],
            games: null,
            teams : [],
            errorMessage: "",
        }

        this.loadTimmies = this.loadTimmies.bind(this);
        this.loadSetData = this.loadSetData.bind(this);
        this.loadTeamData = this.loadTeamData.bind(this);
        this.getTeamAbbreviation = this.getTeamAbbreviation.bind(this);
        this.getTimmiesAbbreviation = this.getTimmiesAbbreviation.bind(this);
    }

    componentDidMount() {
        this.loadTimmies();
        this.loadTeamData();
    }

    loadTimmies() {
        const promise = axios.post("https://cors.bridged.cc/http://ec2-54-158-170-220.compute-1.amazonaws.com/api/v1/players");
        promise.then((response) => {
            this.setState({ loading: false, games: response.data.games });
            this.loadSetData(response.data.sets);
        })
            .catch((error) => {
                this.setState({ errorMessage: "Something went wrong. Error: " + error })
            });
    }

    loadTeamData() {
        let nhlLink = "https://cors.bridged.cc/https://api.nhle.com/stats/rest/en/team/summary?isAggregate=false&isGame=false&sort=%5B%7B%22property%22:%22points%22,%22direction%22:%22DESC%22%7D,%7B%22property%22:%22wins%22,%22direction%22:%22DESC%22%7D%5D&start=0&limit=50&factCayenneExp=gamesPlayed%3E=1&cayenneExp=gameTypeId=2%20and%20seasonId%3C=20202021%20and%20seasonId%3E=20202021";
        let instance = axios.create({
            baseURL: nhlLink,
            withCredentials: false,
            headers: {
            }
        });
        const promise = instance.get();
        promise.then((response) => {
            //go through each team and set it's abbreviation
            let teamData = response.data.data;
            for (let i = 0; i < teamData.length; i++) {
                let fullName = teamData[i].teamFullName;                
                let abbr = this.getTeamAbbreviation(fullName);
                let timmiesAbbr = this.getTimmiesAbbreviation(fullName);
                
                teamData[i].teamAbbr = abbr;
                if (timmiesAbbr) {
                    teamData[i].timmiesAbbr = timmiesAbbr;
                }
                else {
                    teamData[i].timmiesAbbr = abbr;
                }
            }
            this.setState({ teams: teamData });

        }).catch((error) => {
                    console.log("Unable to get team stats from NHL website. Error: " + error)
                });
    }

    getTeamAbbreviation(teamFullName) {      
        let selectedTeam = teamData.teams.find(team => team.fullName === teamFullName);
        return selectedTeam ? selectedTeam.abbreviation : "MTL"; //if it can't find it, its because of special character in montreal
    }

    getTimmiesAbbreviation(teamFullName) {
        let selectedTeam = teamData.teams.find(team => team.fullName === teamFullName);
        if (selectedTeam) {
            return selectedTeam.timmiesAbbreviation ? selectedTeam.timmiesAbbreviation : "";
        }
    }


    loadSetData(sets) {
        sets.map((set) => {
            set.players.map((player) => {
                //we want to see if we can find the player in the player.json table which means the tims name and nhl name do not match
                let firstName = player.firstName.trim();
                let lastName = player.lastName.trim();
                let fullName = firstName + " " + lastName;
                let jsonPlayer = playerNames.players.find(playerName => playerName.timmiesName === fullName);
                if (jsonPlayer) {
                    firstName = jsonPlayer.firstName;
                    lastName = jsonPlayer.lastName;
                }


                let basicSearchLink = "https://cors.bridged.cc/https://api.nhle.com/stats/rest/en/skater/summary?cayenneExp=gameTypeId=2%20and%20seasonId%3E=20202021%20and%20skaterFullName%20likeIgnoreCase%20%22%25" + firstName + "%20" + lastName + "%25%22";
                let basicSearch = axios.create({
                    baseURL: basicSearchLink,
                    withCredentials: false,
                    headers: {
                    }
                });
                const basicPromise = basicSearch.get();
                basicPromise.then((response) => {
                    const basicData = response.data.data[0];
                    let key = player.firstName + player.lastName;
                    if (basicData) {
                        key = data.playerId
                    }


                    let playerIdLink = "https://cors.bridged.cc/https://api.nhle.com/stats/rest/en/skater/summary?cayenneExp=gameTypeId=2%20and%20seasonId%3E=20202021%20and%20skaterFullName%20likeIgnoreCase%20%22%25" + firstName + "%20" + lastName + "%25%22";
                    let basicSearch = axios.create({
                        baseURL: playerIdLink,
                        withCredentials: false,
                        headers: {
                        }
                    });


                    let playerData = { firstName: player.firstName, lastName: player.lastName, position: player.position, key: key, nhldata: basicData};

                    //shallow copy of entire array
                    let newPlayerLists = [...this.state.playerLists];
                    let playerList = newPlayerLists[set.id - 1];
                    playerList.players = [...playerList.players, playerData]
                    this.setState({ playerLists: newPlayerLists });
                }).catch((error) => {
                    console.log("Player get didn't work for " + player.firstName + " " + player.lastName + ". Error: " + error)
                });
            });     
        });
    }

    render() {

        let display = <div>ok</div>

        if (this.state.loading) {
            display = <div><img src="https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif" alt="loading..." /></div>
        }
        else if (this.state.errorMessage) {
            display = <div>{this.state.errorMessage}</div>
        }
        else {
            display = <div><PlayerLists playerLists={this.state.playerLists} games={this.state.games} teams={this.state.teams}/></div>
        }
        return (display);
    }
}

export default TimmiesApp;