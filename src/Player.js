import React, { Component } from 'react'
import axios from 'axios'

class Player extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gamesplayed: 0,
            goals : 0,
        }

        this.loadPlayerData = this.loadPlayerData.bind(this);
        this.goalspergame = this.goalspergame.bind(this);
    }

    componentDidMount() {
        this.loadPlayerData();
    }

    loadPlayerData() {
        const playerLink = "https://cors.bridged.cc/https://api.nhle.com/stats/rest/en/skater/summary?cayenneExp=gameTypeId=2%20and%20seasonId%3E=20202021%20and%20skaterFullName%20likeIgnoreCase%20%22%25" + this.props.playerInfo.firstName + "%20" + this.props.playerInfo.lastName + "%25%22";
        const instance = axios.create({
            baseURL: playerLink,
            withCredentials: false,
            headers: {
            }
        });
        const promise = instance.get();
        promise.then((response) => {
            console.log("player data");
            console.log(response);
            const data = response.data.data[0];
            this.setState({ gamesplayed: data.gamesPlayed, goals: data.goals });
        }).catch((error) => {
            console.log("Player get didn't work " + error)
        });
    }

    goalspergame() {
        if (this.state.gamesplayed === 0) {
            return 0;
        }
        else {
            return (this.state.goals / this.state.gamesplayed).toFixed(2);
        }
    }


    render() {
        return <div>{this.props.playerInfo.firstName} {this.props.playerInfo.lastName} GP: {this.state.gamesplayed} G: {this.state.goals} G/GP: { this.goalspergame()}</div>
    }
}

export default Player;