import React, { Component } from 'react'
import PlayerLists from './PlayerLists'
import axios from 'axios'

class TimmiesApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            playerLists: [{ id: "1", players: [] }, { id: "2", players: [] }, { id: "3", players: []}],
            errorMessage: "",
        }

        this.loadTimmies = this.loadTimmies.bind(this);
        this.loadSetData = this.loadSetData.bind(this);
    }

    componentDidMount() {
        this.loadTimmies();
    }

    loadTimmies() {
        const promise = axios.post("https://cors.bridged.cc/http://ec2-54-158-170-220.compute-1.amazonaws.com/api/v1/players");
        promise.then((response) => {
            this.setState({ loading: false });
            this.loadSetData(response.data.sets);
        })
            .catch((error) => {
                this.setState({ errorMessage: "Something went wrong. Error: " + error })
            });
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

                    let playerData = { firstName: player.firstName, lastName: player.lastName, key: key, nhldata: data};

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
            display = <div><PlayerLists playerLists={this.state.playerLists}/></div>
        }
        return (display);
    }
}

export default TimmiesApp;