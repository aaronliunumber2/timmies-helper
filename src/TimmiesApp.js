import React, { Component } from 'react'
import PlayerLists from './PlayerLists'
import teamData from './teams.json'
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
                
                teamData[i].teamAbbr = abbr;
            }
            console.log(teamData)
            this.setState({ teams: teamData });

        }).catch((error) => {
                    console.log("Unable to get team stats from NHL website. Error: " + error)
                });
    }

    getTeamAbbreviation(teamFullName) {      
        let selectedTeam = teamData.teams.find(team => team.fullName === teamFullName);
        return selectedTeam ? selectedTeam.abbreviation : "MTL"; //if it can't find it, its because of special character in montreal
    }


    loadSetData(sets) {
        sets.map((set) => {
            set.players.map((player) =>{
                let playerLink = "https://cors.bridged.cc/https://api.nhle.com/stats/rest/en/skater/summary?cayenneExp=gameTypeId=2%20and%20seasonId%3E=20202021%20and%20skaterFullName%20likeIgnoreCase%20%22%25" + player.firstName + "%20" + player.lastName + "%25%22";
                let instance = axios.create({
                    baseURL: playerLink,
                    withCredentials: false,
                    headers: {
                    }
                });
                const promise = instance.get();
                promise.then((response) => {
                    const data = response.data.data[0];
                    let key = player.firstName + player.lastName;
                    if (data) {
                        key = data.playerId
                    }

                    let playerData = { firstName: player.firstName, lastName: player.lastName, position : player.position, key: key, nhldata: data};

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