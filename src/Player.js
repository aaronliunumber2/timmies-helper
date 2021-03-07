import React, { Component } from 'react'
import axios from 'axios'

class Player extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gamesplayed: 0,
            goals : 0,
        }

        this.getGoalsPerGame = this.getGoalsPerGame.bind(this);
        this.getShotsPerGame = this.getShotsPerGame.bind(this);
        this.getGamesPlayed = this.getGamesPlayed.bind(this);
        this.getGoals = this.getGoals.bind(this);
    }

    getGamesPlayed() {
        if (this.props.player.nhldata) {
            return this.props.player.nhldata.gamesPlayed;
        }
        else {
            return 0;
        }
    }

    getGoals() {
        if (this.props.player.nhldata) {
            return this.props.player.nhldata.goals;
        }
        else {
            return 0;
        }
    }

    getGoalsPerGame() {
        if (!this.props.player.nhldata || this.props.player.nhldata.gamesPlayed === 0) {
            return 0;
        }
        else {
            return (this.props.player.nhldata.goals / this.props.player.nhldata.gamesPlayed).toFixed(2);
        }
    }

    getShotsPerGame() {
        if (!this.props.player.nhldata || this.props.player.nhldata.gamesPlayed === 0) {
            return 0;
        }
        else {
            return (this.props.player.nhldata.shots / this.props.player.nhldata.gamesPlayed).toFixed(2);
        }
    }


    render() {
        return (
            <div>{this.props.player.firstName.substring(0, 1)}. {this.props.player.lastName} - {this.props.player.position} GP: {this.getGamesPlayed()} Shots/GP: {this.getShotsPerGame()} G: {this.getGoals()} G/GP: {this.getGoalsPerGame()}</div>
            )
    }
}

export default Player;