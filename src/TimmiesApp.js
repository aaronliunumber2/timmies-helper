import React, { Component } from 'react'
import PlayerLists from './PlayerLists'
import Warnings from './Warnings';
import teamData from './data/teams.json'
import playerNames from './data/playerNames.json'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import Player from './Player'

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
            seasonType: "regular",
            currentView: "overall",
            trendGames: 5,
            trendGamesInput : 5,
            playerListColumns: null,
            postponedGames : null,
            playerInjuries: [],
            webInjuries : null,
        }

        this.loadTimmies = this.loadTimmies.bind(this);
        this.loadSetData = this.loadSetData.bind(this);
        this.loadInjuryData = this.loadInjuryData.bind(this);
        this.loadTeamData = this.loadTeamData.bind(this);

        this.getPlayerOpponent = this.getPlayerOpponent.bind(this);
        this.getTeamAbbreviation = this.getTeamAbbreviation.bind(this);
        this.getTimmiesAbbreviation = this.getTimmiesAbbreviation.bind(this);

        this.setOverallColumns = this.setOverallColumns.bind(this);
        this.setTrendColumns = this.setTrendColumns.bind(this);
        this.setTrendGames = this.setTrendGames.bind(this);

        this.adjustTrendGames = this.adjustTrendGames.bind(this);
        this.getLowerTrendGamesPlayed = this.getLowerTrendGamesPlayed.bind(this);
        this.getTOIFromPastGames = this.getTOIFromPastGames.bind(this);
        this.getValueFromPastGames = this.getValueFromPastGames.bind(this);
        this.getGoalStreak = this.getGoalStreak.bind(this);

        this.setCurrentView = this.setCurrentView.bind(this);

    }

    componentDidMount() {
        this.setOverallColumns();
        this.loadTeamData();
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
            this.setState({ teams: teamData }, this.loadInjuryData());



        }).catch((error) => {
            console.log("Unable to get team stats from NHL website. Error: " + error)
            this.setState({ errorMessage: "Sorry!  Unable to load data from the NHL website.  Please try again later." });
                });
    }

    loadInjuryData() {
        const promise = axios.get("https://cors.bridged.cc/https://www.rotowire.com/hockey/tables/injury-report.php?team=ALL&pos=ALL");
        promise.then((response) => {
            this.setState({ webInjuries: response.data }, this.loadTimmies());
        })
            .catch((error) => {
                this.loadTimmies()
            });
    }

    loadTimmies() {
        const promise = axios.post("https://cors.bridged.cc/http://ec2-54-158-170-220.compute-1.amazonaws.com/api/v1/players");
        promise.then((response) => {
            this.loadNHLGames(response.data);
        })
            .catch((error) => {
                console.log(error);
                this.setState({ errorMessage: "Sorry!  Unable to load Tims Hockey Challenge Data.  Please try again later." });
            });
    }

    loadNHLGames(timmiesData) {

        let timmiesGames = timmiesData.games;

        if (timmiesGames.length > 0) {
            let firstTimmiesGame = timmiesGames[0];
            let gameStartTime = new Date(firstTimmiesGame.startTime);
            gameStartTime.setHours(gameStartTime.getHours() - 7); //pacific time
            //let date = gameStartTime.substring(0, gameStartTime.indexOf("T"));
            //let date = gameStartTime.getFullYear() + "-" + gameStartTime.get().toString().padStart(2, "0") + "-" + gameStartTime.getDay().toString().padStart(2, "0");
            let date = gameStartTime.toISOString().slice(0, 10);
            console.log("Date" + date);
            const nhlGamespromise = axios.get("https://cors.bridged.cc/https://statsapi.web.nhl.com/api/v1/schedule?date=" + date);
            nhlGamespromise.then((response) => {

                //go through and check if there are postponed games
                const games = response.data.dates[0].games;
                let postponedGames = games.filter(game => game.status.detailedState === "Postponed");
               

                this.setState({ loading: false, games: games, postponedGames : postponedGames }, this.loadSetData(timmiesData.sets));
            })
                .catch((error) => {
                    console.log(error);
                    this.setState({ errorMessage: "Sorry!  Unable to load game day schedule from NHL website.  Please try again later." });
                });
        }
        else {
            this.setState({ errorMessage: "No games today!" });
        }
    }

    //this is where all the players data gets loaded through multiple requests
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
                        //if we can't find the nhl player just add it but with placeholder fake data
                        let fakenhldata = { teamAbbrevs: "nhl" }
                        let fakeopponent = { teamAbbr : "nhl", goalsAgainstPerGame : 0}
                        let playerData = { firstName: player.firstName, lastName: player.lastName, shortName: firstName.substring(0, 1) + ". " + lastName, position: player.position, key: key, nhldata : fakenhldata, opponent : fakeopponent};

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

                        //get the correct stats from the playerStats and that is a new object in player
                        let seasonStats = playerStatsData.stats[0].splits[0].stat;


                        let playerDataTeam = playerStatsData.currentTeam.name;
                        //montreal canadiens has an accent, problem finding it in the json
                        if (playerDataTeam.includes("Canadiens")) {
                            playerDataTeam = "Montreal Canadiens";
                        }

                        let team = teamData.teams.find(team => team.fullName === playerDataTeam);
                        if (team != null) {
                            //change the player's team to the current team based on playerstats data (that is more accurate than the summary search)
                            basicData.teamAbbrevs = team.abbreviation;
                        }
                        else {
                            console.log("Could not find team " + playerDataTeam);
                        }
                        

                        //game log search
                        let gameLogLink = "https://cors.bridged.cc/";
                        gameLogLink += "https://statsapi.web.nhl.com/api/v1/people/"
                        gameLogLink += key;
                        gameLogLink += "/stats?stats=gameLog&expand=stats.team&season=";
                        gameLogLink += this.state.currentSeason;
                        let gameLogSearch = axios.create({
                            baseURL: gameLogLink,
                            withCredentials: false,
                            headers: {
                            }
                        });

                        const gameLogPromise = gameLogSearch.get();
                        gameLogPromise.then((response) => {
                            let gameLogSplits = response.data.stats[0].splits;

                            //formatted/custom data
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
                                shortName: firstName.substring(0, 1) + ". " + lastName,
                                position: player.position,
                                key: key,
                                id: key,
                                nhldata: basicData,
                                statsdata : seasonStats,
                                gamelogData: gameLogSplits,
                                opponent: opponent,                               
                            };

                            //shallow copy of entire array
                            let newPlayerLists = [...this.state.playerLists];
                            let playerList = newPlayerLists[set.id - 1];
                            playerList.players = [...playerList.players, playerData]

                            //see if the player is injured
                            if (this.state.webInjuries) { //it may be null if this call failed and that is OK
                                let injury = this.state.webInjuries.find((injury) => injury.player === playerData.fullName);
                                if (injury) {
                                    playerData.injury = injury;
                                }
                            }

                            if (playerData.injury) {
                                let newInjuryList = [...this.state.playerInjuries, playerData.injury];
                                this.setState({ playerLists: newPlayerLists, playerInjuries: newInjuryList });
                            }
                            else {
                                this.setState({ playerLists: newPlayerLists });
                            }
                        }).catch((error) => {
                            console.log("Game log stats failed for " + player.firstName + " " + player.lastName + ". Error: " + error);
                        });

                    }).catch((error) => {
                        console.log("Player stats failed for " + player.firstName + " " + player.lastName + ". Error: " + error);
                    });

                }).catch((error) => {
                    console.log("Player search didn't work for " + player.firstName + " " + player.lastName + ". Error: " + error)
                });
            });
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

                let game;
                game = this.state.games.find(game => game.teams.home.team.name === playerTeam.teamFullName || game.teams.away.team.name === playerTeam.teamFullName);
                if (game) {
                    if (game.teams.home.team.name === playerTeam.teamFullName) {
                        opponent = this.state.teams.find(team => team.teamFullName === game.teams.away.team.name);
                    }
                    else {
                        opponent = this.state.teams.find(team => team.teamFullName === game.teams.home.team.name);
                    }
                }
                else {
                    console.log("Can't find game for player " + basicData.skaterFullName);
                }
            }
            else {
                console.log("Can't find player team for player " + basicData.skaterFullName);
            }
        }

        if (!opponent) {
            console.log("Failed to get opponent for " + basicData.skaterFullName);
            console.log("Team Abbr: " + basicData.teamAbbrevs);
            opponent = { teamAbbr: "nhl", goalsAgainstPerGame: 0 };
        }
        return opponent;
    }

    setCurrentView(view) {
        if (view != this.state.currentView) {
            this.setState({ currentView: view }, () => { if (view === "trend") this.setTrendColumns(); else this.setOverallColumns() });
        }
    }

    setOverallColumns() {
        const playerListColumns = [
            {
                Header: " ",
                id: "name",
                columns: [
                    {
                        Header: "Name",
                        id: "playerName",
                        accessor: "shortName",
                        className: "player-name",
                        Cell: props =>
                            <div>
                                <img className="team-logo" src={process.env.PUBLIC_URL + "/assets/logos/" + props.row.original.nhldata.teamAbbrevs + ".png"} /> <a target="_blank" href={"https://www.nhl.com/player/" + props.row.original.key}>{props.value}</a>
                            </div>,
                    },
                    {
                        Header: "Pos",
                        id: "playerPosition",
                        accessor: "position",
                        className: "short-stat"
                    },
                    {
                        Header: "GP",
                        id: "playerGames",
                        accessor: "nhldata.gamesPlayed",
                        className: "short-stat"
                    },
                    {
                        Header: "G",
                        id: "playerGoals",
                        accessor: "nhldata.goals",
                        className: "short-stat"
                    },
                    {
                        Header: "Shots/GP",
                        id: "playerShotsPerGame",
                        accessor: "nhldata.shotsPerGame",
                        className: "long-stat"
                    },
                    {
                        Header: "PP.TOI/GP",
                        id: "playerPPTimePerGame",
                        accessor: "statsdata.powerPlayTimeOnIcePerGame",
                        className: "long-stat"
                    },
                    {
                        Header: "TOI/GP",
                        id: "playerTimePerGame",
                        accessor: "statsdata.timeOnIcePerGame",
                        className: "long-stat"
                    },
                    {
                        Header: "Goals/GP",
                        id: "playerGoalsPerGame",
                        accessor: "nhldata.goalsPerGame",
                        className: "short-stat"
                    },
                    {
                        Header: "Opp.GAA",
                        id: "playerOppGAA",
                        accessor: "opponent.goalsAgainstPerGame",
                        Cell: props => <div><img className="team-logo" src={process.env.PUBLIC_URL + "/assets/logos/" + props.row.original.opponent.teamAbbr + ".png"} /> {props.value.toFixed(2)}</div>,
                        className: "long-stat"
                    }

                ]
            }];

        this.setState({ playerListColumns });
    }

    setTrendColumns() {
        const playerListColumns = [
            {
                Header: " ",
                id: "name",
                columns: [
                    {
                        Header: "Name",
                        id: "playerName",
                        accessor: "shortName",
                        className: "player-name",
                        Cell: props =>
                            <div>
                                <img className="team-logo" src={process.env.PUBLIC_URL + "/assets/logos/" + props.row.original.nhldata.teamAbbrevs + ".png"} /> <a target="_blank" href={"https://www.nhl.com/player/" + props.row.original.key}>{props.value}</a>
                            </div>,
                    },
                    {
                        Header: "Pos",
                        id: "playerPosition",
                        accessor: "position",
                        className: "short-stat"
                    },
                    {
                        Header: "Games",
                        id: "games",
                        accessor: (row) => this.getLowerTrendGamesPlayed(row, this.state.trendGames),
                        className: "short-stat"
                    },
                    {
                        Header: "G",
                        id: "playerGoals",
                        accessor: (row) => { return this.getValueFromPastGames(row, "goals", this.state.trendGames) },
                        className: "short-stat"
                    },
                    {
                        Header: "Shots/GP",
                        id: "playerShotsPerGame",
                        accessor: (row) => { return (this.getValueFromPastGames(row, "shots", this.state.trendGames) / this.getLowerTrendGamesPlayed(row, this.state.trendGames)).toFixed(2) },
                        className: "long-stat",
                    },
                    {
                        Header: "PP.TOI/GP",
                        id: "playerPPTimePerGame",
                        accessor: (row) => { return this.getTOIFromPastGames(row, "powerPlayTimeOnIce", this.state.trendGames) },
                        className: "long-stat"
                    },
                    {
                        Header: "TOI/GP",
                        id: "playerTimePerGame",
                        accessor: (row) => { return this.getTOIFromPastGames(row, "timeOnIce", this.state.trendGames) },
                        className: "long-stat"
                    },
                    {
                        Header: "Goals/GP",
                        id: "playerGoalsPerGame",
                        accessor: (row) => { return (this.getValueFromPastGames(row, "goals", this.state.trendGames) / this.getLowerTrendGamesPlayed(row, this.state.trendGames)).toFixed(2) },
                        className: "short-stat",
                    },
                    {
                        Header: "Opp.Season GAA",
                        id: "playerOppGAA",
                        accessor: "opponent.goalsAgainstPerGame",
                        Cell: props => <div><img className="team-logo" src={process.env.PUBLIC_URL + "/assets/logos/" + props.row.original.opponent.teamAbbr + ".png"} /> {props.value.toFixed(2)}</div>,
                        className: "long-stat"
                    }

                ]
            }];

        this.setState({ playerListColumns });
    }

    getValueFromPastGames(player, field, numGames) {
        const splits = player.gamelogData;
        if (!splits) {
            return 0;
        }
        let returnValue = 0;
        let maxGames = numGames <= splits.length ? numGames : splits.length;
        for (let i = 0; i <= maxGames -1; i++) {
            const game = splits[i];
            const gameStats = game.stat;
            returnValue += parseInt(gameStats[field]);
        }

        return returnValue;
    }

    getTOIFromPastGames(player, field, numGames) {
        const splits = player.gamelogData;
        if (!splits) {
            return 0;
        }
        let minutes = 0;
        let seconds = 0;
        let maxGames = numGames <= splits.length ? numGames : splits.length;
        for (let i = 0; i <= maxGames - 1; i++) {
            const game = splits[i];
            const gameStats = game.stat;
            let toiValue = gameStats[field];
            let toiSplit = toiValue.split(":");
            let gameMinutes = toiSplit[0];
            let gameSeconds = toiSplit[1];

            minutes += parseInt(gameMinutes);
            seconds += parseInt(gameSeconds);
        }

        let trendOrGamesPlayed = this.getLowerTrendGamesPlayed(player, numGames);
        let totalSeconds = seconds + (minutes * 60);
        let trendSeconds = totalSeconds / trendOrGamesPlayed;
        let finalMinutes = trendSeconds / 60;
        let finalSeconds = trendSeconds % 60;

        return Math.floor(finalMinutes) + ":" + Math.floor(finalSeconds).toString().padStart(2, "0");
    }

    getGoalStreak(player) {
        var gamelog = player.gamelogData;
        var streak = 0;
        
        if (gamelog.length > 0) {
            //check the first one to see if they scored or not.  If they did start at 1, if they didn't be negative 1
        }

        return streak;
    }

    getGoalsPerGameVsOpponent(player) {
        var opponent = player.opponent;
        var gamelog = player.gamelogData;
        var goals = 0;
        if (gamelog.length > 0) {

        }
        return goals;
    }

    getLowerTrendGamesPlayed(player, numGames) {
        return numGames < player.nhldata.gamesPlayed ? numGames : player.nhldata.gamesPlayed
    }

    adjustTrendGames(number) {
        let newTrendGames = parseInt(this.state.trendGames) + parseInt(number);

        if (newTrendGames > 0) {
            this.setTrendGames(newTrendGames);
        }
    }

    setTrendGames(number) {
        const newValue = parseInt(number);

        if (Number.isInteger(newValue)) {
            if (newValue > 0) {
                this.setState({ trendGamesInput: newValue, trendGames: newValue }, this.setTrendColumns());
            }
        }
        else {
            //special rule for empty, allow it but it won't set the actual trend games state
            if (number === "") {
                this.setState({ trendGamesInput: number });
            }
        }

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
            let trendSettings;
            if (this.state.currentView === "trend") {
                trendSettings = <div className="trend-settings"><Button variant="light" onClick={() => this.adjustTrendGames(-1)}>-</Button>Last <input className="trend-games" value={this.state.trendGamesInput} onChange={(e) => { this.setTrendGames(e.target.value); }} /> Games<Button variant="light" onClick={() => this.adjustTrendGames(1)}>+</Button></div>
            }
            let warnings;
            if (this.state.postponedGames || this.state.playerInjuries) {
                warnings = <Warnings postponedGames={this.state.postponedGames} injuries={this.state.playerInjuries}/>
            }
            display =
                <div>
                {warnings}
                <Button onClick={(e) => this.setCurrentView("overall")} variant={this.state.currentView === "overall" ? "dark" : "light"}>Overall</Button><Button onClick={(e) => this.setCurrentView("trend")} variant={this.state.currentView === "trend" ? "dark" : "light"}>Trend</Button>
                {trendSettings}                
                <PlayerLists playerLists={this.state.playerLists} games={this.state.games} teams={this.state.teams} playerListColumns={this.state.playerListColumns} />
                </div>
        }
        return (display);
    }
}

export default TimmiesApp;