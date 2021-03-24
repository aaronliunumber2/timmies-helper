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
            currentSeason: "20202021",
            seasonType : "regular",
        }

        this.loadTimmies = this.loadTimmies.bind(this);
        this.loadSetData = this.loadSetData.bind(this);
        this.loadTeamData = this.loadTeamData.bind(this);
        this.getPlayerOpponent = this.getPlayerOpponent.bind(this);
        this.getTeamAbbreviation = this.getTeamAbbreviation.bind(this);
        this.getTimmiesAbbreviation = this.getTimmiesAbbreviation.bind(this);
    }

    componentDidMount() {
        this.loadTeamData();
    }

    loadTimmies() {
        const promise = axios.post("https://cors.bridged.cc/http://ec2-54-158-170-220.compute-1.amazonaws.com/api/v1/players");
        promise.then((response) => {
            this.setState({ loading: false, games: response.data.games }, this.loadSetData(response.data.sets));
        })
            .catch((error) => {
                this.setState({ errorMessage: "Sorry!  Unable to load Tims Hockey Challenge Data.  Please try again later." });
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
            this.setState({ teams: teamData }, this.loadTimmies());



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

    getPlayerOpponent(basicData) {
        let opponent = null;
        if (basicData) {
            let playerTeamAbbr = basicData.teamAbbrevs;
            let playerTeam = this.state.teams.find(team => team.teamAbbr === playerTeamAbbr);
            if (playerTeam) {
                let game = this.state.games.find(game => game.teams.home.abbr === playerTeam.timmiesAbbr || game.teams.away.abbr === playerTeam.timmiesAbbr);
                if (game) {
                    if (game.teams.home.abbr === playerTeamAbbr) {
                        opponent = this.state.teams.find(team => team.timmiesAbbr === game.teams.away.abbr);
                    }
                    else {
                        opponent = this.state.teams.find(team => team.timmiesAbbr === game.teams.home.abbr);
                    }
                }
            }
        }

        if (!opponent) {
            console.log("Failed to get opponent for " + basicData.skaterFullName);
            console.log("Team Abbr: " + basicData.teamAbbrevs);

        }
        return opponent;
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
                    console.log("Found timmies player " + fullName + ". Renamed to " + firstName + " " + lastName);
                }




                //get basic nhl data
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
                        key = basicData.playerId;
                    }
                    else { 
                        //if we can't find the nhl player just add it but with no stats
                        let playerData = { firstName: player.firstName, lastName: player.lastName, position: player.position, key: key };

                        //shallow copy of entire array
                        let newPlayerLists = [...this.state.playerLists];
                        let playerList = newPlayerLists[set.id - 1];
                        playerList.players = [...playerList.players, playerData]
                        this.setState({ playerLists: newPlayerLists });
                    }


                    let playerIdLink = "https://cors.bridged.cc/";
                    playerIdLink = playerIdLink + "https://statsapi.web.nhl.com/api/v1/people/";
                    playerIdLink = playerIdLink + key;
                    playerIdLink = playerIdLink + "?expand=person.stats&stats=";
                    if (this.state.seasonType === "regular") {
                        playerIdLink = playerIdLink + "statsSingleSeason";
                    }
                    else {
                        playerIdLink = playerIdLink + "statsSingleSeasonPlayoffs";
                    }
                    playerIdLink = playerIdLink + "&season=" + this.state.currentSeason;

                    let playerSearch = axios.create({
                        baseURL: playerIdLink,
                        withCredentials: false,
                        headers: {
                        }
                    });

                    const playerSearchPromise = playerSearch.get();
                    playerSearchPromise.then((response) => {
                        let playerStatsData = response.data.people[0];

                        //first check if they belong to multiple teams, if so we need to check the teams json to set the proper abbreviation
                        if (basicData.teamAbbrevs.includes(",")) {
                            let playerDataTeam = playerStatsData.currentTeam.name;
                            let team = teamData.teams.find(team => team.fullName === playerDataTeam);
                            basicData.teamAbbrevs = team.abbreviation;
                        }

                        //get the correct stats from the playerStats and that is a new object in player
                        let seasonStats = playerStatsData.stats[0].splits[0].stat;

                        //get the opponent from the team list
                        let opponent = null;
                        if (basicData) {
                            opponent = this.getPlayerOpponent(basicData);
                        }

                        //add goalsPerGame and shotsPerGame to basic data
                        basicData.goalsPerGame = (basicData.goals / basicData.gamesPlayed).toFixed(2);
                        basicData.shotsPerGame = (basicData.shots / basicData.gamesPlayed).toFixed(2);
                        player.fullName = fullName;
                        player.shortName = firstName.substring(0, 1) + " " + lastName;

                        let playerData = {
                            firstName: player.firstName,
                            lastName: player.lastName,
                            fullName: player.firstName + " " + player.lastName,
                            shortName : firstName.substring(0, 1) + ". " + lastName,
                            position: player.position,
                            key: key,
                            id: key,
                            nhldata: basicData,
                            statsdata: seasonStats,
                            opponent: opponent
                        };

                        //shallow copy of entire array
                        let newPlayerLists = [...this.state.playerLists];
                        let playerList = newPlayerLists[set.id - 1];
                        playerList.players = [...playerList.players, playerData]
                        this.setState({ playerLists: newPlayerLists });

                    }).catch((error) => {
                        console.log("Player stats failed for " + player.firstName + " " + player.lastName + ". Error: " + error);
                    });

                }).catch((error) => {
                    console.log("Player search didn't work for " + player.firstName + " " + player.lastName + ". Error: " + error)
                });
            });     
        });
    }

    render() {

        let display = <div>ok</div>

        if (this.state.errorMessage) {
            display = <div className="error-message">{this.state.errorMessage}</div>
        }
        else if (this.state.loading) {
            display = <div><img src="https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif" alt="loading..." /></div>
        }
        else {
            display = <div><PlayerLists playerLists={this.state.playerLists} games={this.state.games} teams={this.state.teams}/></div>
        }
        return (display);
    }
}

export default TimmiesApp;