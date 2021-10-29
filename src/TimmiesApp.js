import React, { Component } from 'react'
import { instanceOf } from "prop-types"
import PlayerLists from './PlayerLists'
import Warnings from './Warnings';
import teamData from './data/teams.json'
import playerNames from './data/playerNames.json'
import axios from 'axios'
import { Button, Dropdown } from 'react-bootstrap'

class TimmiesApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            playerLists: [{ id: "1", players: [] }, { id: "2", players: [] }, { id: "3", players: [] }],
            games: null,
            teams : [],
            errorMessage: "",
            currentSeason: "20212022",
            currentSeasonFormatted: "2021-2022",
            actualSeason: "20212022",
            seasonType: "regular",
            currentView: "overall",
            trendGames: 5,
            trendGamesInput : 5,
            playerListColumns: null,
            postponedGames : null,
            playerInjuries: [],
            webInjuries: null,
            bearerToken: "",
            test: "eyJraWQiOiI2MkY1WVArTnZlZVFaVkhjak50bGh1UmJmU3R3bEhYTnNBMlo0TEVIZnd3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0Yzk2NWRjYS1hYTk1LTQzZDUtYTdmZS1jNDc2NDFmN2M1MDgiLCJhdWQiOiIzZm10bm9rbXB0cTRsM3E3cGZoYW00bzJmbiIsImV2ZW50X2lkIjoiZDAzODdhYTQtY2ZlMS00NDlkLTkwYWYtYzc5ZGJkODg1MGI0IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2MzQ1MzI2NDQsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX2RXTGRvenhGeiIsImNvZ25pdG86dXNlcm5hbWUiOiI0Yzk2NWRjYS1hYTk1LTQzZDUtYTdmZS1jNDc2NDFmN2M1MDgiLCJleHAiOjE2MzQ1MzYyNDUsImlhdCI6MTYzNDUzMjY0NSwiZW1haWwiOiJ6b3JiYW5lQGdtYWlsLmNvbSJ9.EtAG4kIvllRnW6g_vcvsMlP50dckyfawV4DWIXtsa6RC9XMXYPjHW7_A-NyVPXf_kbdszzSrB0-uLEgLJ4iE3a_GqgK8lEjNZwTXEr6sBY5LRDhURqudfItQWLi7Zs3GveMEBaXRdyoFfYIxBMahhoQxKB3td4BR8TYRQqPWjAeqqKsfIhucMbNyrfkJc0AJKKwAa65SWHR51ulnjNVL9HlwPehb758ksbJd_SYjOf0eP9Dj71BMQOz1nTU5apHZAhf26xDTEbi4XIpD8Uy7MAp45JjIxzcVX-TV1yEh8sKf1myQR-lX4Vl1wuN66_Vtpw2BRNhFbaKymKwD2WxpNQ",
        }     


        this.getBearerToken = this.getBearerToken.bind(this);
        //this.getPastebinBearer = this.getPastebinBearer.bind(this);
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
        this.setSeasonType = this.setSeasonType.bind(this);
        this.setSeason = this.setSeason.bind(this);
        this.getFormattedSeason = this.getFormattedSeason.bind(this);

    }

    timmiesAuthUrl = "https://cognito-idp.us-east-1.amazonaws.com/";
    zorbaneProxyUrl = "https://proxy-zorbane.herokuapp.com/";
    bridgedUrl = "https://cors.bridged.cc/";
    timmiesUrl = "https://px-api.rbi.digital/hockeyprod/picks";    
    refreshToken = "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.CjgbIYfa_cu2jGKvSG-6JL9AlzlLi0T8XwnwYtkY4uViiqSrTupwTGRaZy7_0-a9La4V4vxRsW4GwJYm_Ke_8p4y1x3bwrkihQxLniOz5tu-Mo9gkpE-mDALpkb9d8KocL04aHCMBDY-KhIQqBIqPf9EsDNY5sb2H6U5sQuILXVKcgbgZp3UE6INix7kKJAEUZ6U9evI_2ag_J_Staj8WQColWX2PJuWIe-DckB0isd6MP2acaC5C3nRUc-YCV8rOlzt-VQvtRstvQhBMVvgsAzJ8LAzumQUvPuV2yS4ESDuxE18UZTYn3LVuHLK0J7qWz1XorIH6VgD1XFeSDHEDw.llJyOnu20ar3zQCo.U_-qRLsDPmFH7t_TJkqmCiBhqXuUAYexL0zrukNOLG_hCmcoIaSbjCVO22u204u2APjPhA2Bk94qgnwfho4Za3ozlPXZk8j-T_rZiKOqX05U2uJTnSoKgb5rLQnuVmtISxL77DiIwIR-SbgJ_Me6iz6Yeztge6DEY6CmTwJUlX30zuQMbT-Fe4vzUUico1ah1SqbqS0TqOVPYFsULXrZgQHeZ9Pe5xsg9E1cdEqLWjZ5YbWjuRXWEqN3ODbz0XE_sfQbKQx9k7asziUubcNAuwH827Wc2z9hCjJhUqzv9K1pLbYkUhZ9oAQ4kt2CnObDFgFMEwXqwYNyCVWRe-6i1fvrhYhTN0Nxm7D6eQTm_3nPasP-_GeZN5RbF49B9j9yz7EPxH03E38qBazNxoR5TPUdrFf4HvWdQ7UVn2LWwURlN58pm0w_NZa0r9SWvQTEGNdsdUumW2ZL4r-IOenCRFPVP_wTnS0w2773vOwk66VnxttMYO8rcprz6cWp5vHfet5C7ISgAWMQyFQEi15bQUuWZxhIohIyCxibnEOHOQwwvb2rzPipWrH8LzVf5MJaSQHYy_sMGFnKim-IbL1BcQIchs2oUh6O9TG1eLjp-7QIcvjFBfX4g9mfuKBbnlyy5nLKVkTGp17yYDVomkHQzLwqBktXW57B3W41GnqPMafxqQ7eNB9FPIvM-U5hIdIHkJVLvSxFsuXnLXwvGqI8zUyAOXgO7hxFlldRNC_9DggqSVnIbTQ0dAQUN_aQu0bB1vRmQK4nwo9M0k21ruadviQnlzzh2zJufA4_zaX4-pW4CdPXtyN8t9fbyZLcgBaMvdfp84v5_pH4xaP34ueMEdouYGjhDCnUeXksuh_9sMX1M4TzcC6BoGywsw9EKfKL83CtzcQUh-esJGkniD_-kVjbWVkiVhocVBg7VOcVs7dG7VfooJCkKXN-h0WPbCYoxhPf9qeAPe_xG8U2IqNOxbNgpOBsKwMcvrXPmQFXFUPlBKDAmqMEAblAg5K8IHkh-qJAWHbavUWpDhuYFz_NJBKbw4LxvHMPrDEr8LH0VkphSxZdadqzmw2L_A2SYw_tooEgY-D7gNNDf6wNYIbk2N54VPm0NYBZ0UXvLcQOIFPBTD-fDsuyRrioi4d0kMMg0BlKrprt3BoIYYUJbmvaRVldQ04gzUlUS2TtFQRZzhU0b-iqvi_NMK1vBTc39rjodK8VfFL-I_a0sDvEjj_9tdkeCd4tdXXB9FGtcMBQ7XSxI92MPTumbvpGw41CjXfQz0j_1DeFW3sL5hlESRBU_u27JLok-mrk_KACtTO73XuXlZD7hA5Zhh66QQ.Uk_qbWs7PfH_J_SlsdwRgw";

    componentDidMount() {
        const { cookies } = this.props;
        const lastSeason = cookies.get("lastSeason");
        this.setOverallColumns();
        if (!lastSeason || lastSeason === this.state.currentSeason) {
            this.getBearerToken();
        }
        else {
            console.log("last season is " + lastSeason)
            this.setSeason(lastSeason)
        }
    }

    getBearerToken() {
        const data = { "ClientId": "3fmtnokmptq4l3q7pfham4o2fn", "AuthFlow": "REFRESH_TOKEN_AUTH", "AuthParameters": { "REFRESH_TOKEN": this.refreshToken, "DEVICE_KEY": null } };
        const headers = {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "max-age=0",
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "AWSCognitoIdentityProviderService.InitiateAuth",
            "x-amz-user-agent": "aws-amplify/0.1.x js"
        };
        const promise = axios.post(
            this.zorbaneProxyUrl + this.timmiesAuthUrl,
            data,
            { headers }
        );

        promise.then((response) => {
            this.setState({ bearerToken: response.data.AuthenticationResult.IdToken }, this.loadInjuryData());
        })
            .catch((error) => {
                console.log("Refresh call failed, use pastebin bearer");
                this.getPastebinBearer();
            });
    }

    //getPastebinBearer() {
    //    const bearerGet = axios.create({
    //        baseURL: this.zorbaneProxyUrl + "https://pastebin.com/raw/VL2VpYjq",
    //        headers: {
    //            "pragma": "no-cache",
    //            "cache-control": "no-cache",
    //            "expires" : 0,
    //        }
    //    });
    //    const promise = bearerGet.get();
    //    promise.then((response) => {
    //        this.setState({ bearerToken: response.data },this.loadInjuryData());
    //    })
    //        .catch((error) => {
    //            this.loadInjuryData()
    //        });
    //}

    loadInjuryData() {
        const injuryGet = axios.create({
            baseURL: this.zorbaneProxyUrl + "https://www.rotowire.com/hockey/tables/injury-report.php?team=ALL&pos=ALL",
            withCredentials: false,
            headers: {
                "X-Requested-With" : "*",
            }
        });
        const promise = injuryGet.get();
        promise.then((response) => {
            this.setState({ webInjuries: response.data }, () => this.loadTeamData());
        })
            .catch((error) => {
                this.loadTeamData()
            });
    }


    loadTeamData() {
        let teamLink = this.zorbaneProxyUrl + "https://api.nhle.com/stats/rest/en/team/summary?isAggregate=false&isGame=false&sort=%5B%7B%22property%22:%22points%22,%22direction%22:%22DESC%22%7D,%7B%22property%22:%22wins%22,%22direction%22:%22DESC%22%7D%5D&start=0&limit=50&factCayenneExp=gamesPlayed%3E=1&cayenneExp=gameTypeId="
        if (this.state.seasonType === "playoffs") {
            teamLink +=  "3";
        }
        else {
            teamLink += "2";
        }
        teamLink += "%20and%20seasonId%3C=" + this.state.actualSeason + "%20and%20seasonId%3E=" + this.state.actualSeason;
        let instance = axios.create({
            baseURL: teamLink,
            withCredentials: false,
            headers: {
                "X-Requested-With": "*",
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
            //also reset the player list and load timmies
            this.setState({ teams: teamData, playerLists: [{ id: "1", players: [] }, { id: "2", players: [] }, { id: "3", players: [] }] }, this.loadTimmies());



        }).catch((error) => {
            console.log("Unable to get team stats from NHL website. Error: " + error)
            this.setState({ errorMessage: "Sorry!  Unable to load data from the NHL website.  Please try again later." });
                });
    }

    loadTimmies() {
        let timmiesUrl = this.zorbaneProxyUrl + this.timmiesUrl;
        const timmiesGet = axios.create({
            baseURL: timmiesUrl, 
            method: "get",
            headers: {
                "pragma": "no-cache",
                "cache-control": "no-cache",
                "authorization": "Bearer " + this.state.bearerToken,
                "accept": "application/json, text/plain, */*",
                "x-cognito-id": "us-east-1:00cc6e37-18ae-4cb7-9e7f-41e0be1924c6",
                "accept-language": "en-CA,en;q=0.9"
            }
        });
        const promise = timmiesGet.get();
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
            const nhlGamesGet = axios.create({
                baseURL: this.zorbaneProxyUrl + "https://statsapi.web.nhl.com/api/v1/schedule?date=" + date,
                withCredentials: false,
                headers: {
                    "X-Requested-With": "*",
                }
            });
            const nhlGamespromise = nhlGamesGet.get();
            nhlGamespromise.then((response) => {

                //go through and check if there are postponed games
                const games = response.data.dates[0].games;
                let postponedGames = games.filter(game => game.status.detailedState === "Postponed");
               

                this.setState({ loading: false, games: games, postponedGames : postponedGames }, ()=> this.loadSetData(timmiesData.sets));
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
        //empty out the players
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
                let basicSearchLink = this.zorbaneProxyUrl + "https://api.nhle.com/stats/rest/en/skater/summary?cayenneExp=gameTypeId=";
                if (this.state.seasonType === "playoffs") {
                    basicSearchLink += "3";                    
                }
                else {
                    basicSearchLink += "2";
                }
                basicSearchLink += "%20and%20seasonId%3C=" + this.state.currentSeason + "%20and%20seasonId%3E=" + this.state.currentSeason + "%20and%20skaterFullName%20likeIgnoreCase%20%22%25" + firstName + "%20" + lastName + "%25%22";
                let basicSearch = axios.create({
                    baseURL: basicSearchLink,
                    withCredentials: false,
                    headers: {
                        "X-Requested-With": "*",
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


                    let playerIdLink = this.zorbaneProxyUrl + "https://statsapi.web.nhl.com/api/v1/people/";
                    playerIdLink = playerIdLink + key;
                    playerIdLink = playerIdLink + "?expand=person.stats&stats=";
                    if (this.state.seasonType === "playoffs") {
                        playerIdLink = playerIdLink + "statsSingleSeasonPlayoffs";
                    }
                    else {
                        playerIdLink = playerIdLink + "statsSingleSeason";
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
                        let gameLogLink = this.zorbaneProxyUrl + "https://statsapi.web.nhl.com/api/v1/people/"
                        gameLogLink += key;
                        gameLogLink += "/stats?stats=";
                        if (this.state.seasonType === "playoffs") {
                            gameLogLink += "playoffGameLog"
                        }
                        else {
                            gameLogLink += "gameLog";
                        }
                        gameLogLink += "&expand=stats.team & season=";
                        gameLogLink += this.state.currentSeason;
                        let gameLogSearch = axios.create({
                            baseURL: gameLogLink,
                            withCredentials: false,
                            headers: {
                                "X-Requested-With": "*",
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
                            if (this.state.webInjuries && !this.state.playerInjuries.find((p) => p.player === playerData.fullName)) { //it may be null if this call failed and that is OK
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
                console.log("Can't find player team for player " + basicData.skaterFullName + " Team: " + playerTeamAbbr);
            }
        }

        if (!opponent) {
            console.log("Failed to get opponent for " + basicData.skaterFullName);
            opponent = { teamAbbr: "nhl", goalsAgainstPerGame: 0 };
        }
        return opponent;
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

    setCurrentView(view) {
        if (view != this.state.currentView) {
            this.setState({ currentView: view }, () => { if (view === "trend") this.setTrendColumns(); else this.setOverallColumns() });
        }
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
                this.setState({ trendGamesInput: newValue, trendGames: newValue }, () => this.setTrendColumns());
            }
        }
        else {
            //special rule for empty, allow it but it won't set the actual trend games state
            if (number === "") {
                this.setState({ trendGamesInput: number });
            }
        }
    }

    setSeasonType(season) {
        if (season != this.state.seasonType) {
            this.setState({ seasonType: season }, () => this.getBearerToken());
        }
    }

    setSeason(season) {
        if (season != this.state.currentSeason) {
            let seasonFormatted = this.getFormattedSeason(season);
            this.props.cookies.set("lastSeason", season, { path: "/" });
            this.setState({ currentSeason: season, currentSeasonFormatted: seasonFormatted }, () => this.getBearerToken());
        }
    }

    getFormattedSeason(season) {
        let seasonFormatted = season.substring(0, 4) + "-" + season.substring(4, 8);
        return seasonFormatted;
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
                <div className="settings-buttons"><Button onClick={(e) => this.setSeasonType("regular")} variant={this.state.seasonType === "regular" ? "dark" : "light"}>Regular Season</Button><Button onClick={(e) => this.setSeasonType("playoffs")} variant={this.state.seasonType === "playoffs" ? "dark" : "light"}>Playoffs</Button></div>
                <div>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className="season-dropdown">
                            {this.state.currentSeasonFormatted}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="season-dropdown" >
                            <Dropdown.Item onClick={() => this.setSeason("20202021")}> 2020-2021</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setSeason("20212022")}>2021-2022</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="settings-buttons"><Button onClick={(e) => this.setCurrentView("overall")} variant={this.state.currentView === "overall" ? "dark" : "light"}>Overall</Button><Button onClick={(e) => this.setCurrentView("trend")} variant={this.state.currentView === "trend" ? "dark" : "light"}>Trend</Button></div>
                {trendSettings}                
                <PlayerLists playerLists={this.state.playerLists} games={this.state.games} teams={this.state.teams} playerListColumns={this.state.playerListColumns} />
                </div>
        }
        return (display);
    }
}

export default TimmiesApp;