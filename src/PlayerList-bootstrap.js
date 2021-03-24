import React, { Component } from 'react'
import Player from './Player'
import Container from 'react-bootstrap/Row'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class PlayerList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sort: "goalsPerGame",
            ascending: false,
        }

        this.sort = this.sort.bind(this);
        this.setSort = this.setSort.bind(this);
        this.compareString = this.compareString.bind(this);
        this.getShotsPerGame = this.getShotsPerGame.bind(this);
    }

    sort(a, b) {

        let sortFactor = 1;
        if (this.state.ascending) {
            sortFactor = -1;
        }

        if (this.state.sort === "name") {
            return this.compareString(a.firstName, b.firstName) * sortFactor;
        }    
        else if (this.state.sort === "position") {
            return this.compareString(a.position, b.position) * sortFactor;
        }    
        else if (this.state.sort === "games") {
            return (a.nhldata ? a.nhldata.gamesPlayed : 0) - (b.nhldata ? b.nhldata.gamesPlayed : 0) * sortFactor;
        }    
        else if (this.state.sort === "goals") {
            return (a.nhldata ? a.nhldata.goals : 0) - (b.nhldata ? b.nhldata.goals : 0) * sortFactor;
        }        
        else if (this.state.sort === "shotsPerGame") {
            return this.getShotsPerGame(a) - this.getShotsPerGame(b) * sortFactor;
        }
        else if (this.state.sort === "ppTimeOnIce") {
            return this.compareString((a.statsdata ? a.statsdata.powerPlayTimeOnIcePerGame : 0), (b.statsdata ? b.statsdata.powerPlayTimeOnIcePerGame : 0)) * sortFactor;
        }
        else if (this.state.sort === "timeOnIce") {
            return this.compareString((a.statsdata ? a.statsdata.timeOnIcePerGame : 0), (b.statsdata ? b.statsdata.timeOnIcePerGame : 0)) * sortFactor;
        }
        else if (this.state.sort === "opponentGAA") {
            return (a.opponent ? a.opponent.goalsAgainstPerGame : 0) - (b.opponent ? b.opponent.goalsAgainstPerGame : 0) * sortFactor;
        }
        else  //(this.state.sort === "goalsPerGame")  default
        {
            return (a.nhldata ? a.nhldata.goals / a.nhldata.gamesPlayed : 0) - (b.nhldata ? b.nhldata.goals / b.nhldata.gamesPlayed : 0) * sortFactor;
        }
    }

    setSort(e, sort) {
        e.preventDefault();
        if (sort === this.state.sort) {
            this.setState({ ascending: !this.state.ascending });
        }
        else {
            this.setState({ sort, ascending : false});
        }
    }

    compareString(a, b) {
        if (a < b) { return -1; }
        if (a > b) { return 1; }
        return 0;
    }

    getShotsPerGame(player) {
        if (!player.nhldata || player.nhldata.gamesPlayed === 0) {
            return 0;
        }
        else {
            return (player.nhldata.shots / player.nhldata.gamesPlayed).toFixed(2);
        }
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs="2"><a href="#" onClick={(e) => this.setSort(e, "name")}>Name</a></Col>
                    <Col xs="1"><a href="#" onClick={(e) => this.setSort(e, "position")}>Pos</a></Col>
                    <Col xs="1"><a href="#" onClick={(e) => this.setSort(e, "games")}>Games</a></Col>
                    <Col xs="1"><a href="#" onClick={(e) => this.setSort(e, "goals")}>Goals</a></Col>
                    <Col xs="1"><a href="#" onClick={(e) => this.setSort(e, "shotsPerGame")}>Shots/GP</a></Col>
                    <Col xs="1"><a href="#" onClick={(e) => this.setSort(e, "ppTimeOnIce")}>PP.TOI/GP</a></Col>
                    <Col xs="1"><a href="#" onClick={(e) => this.setSort(e, "timeOnIce")}>TOI/GP</a></Col>
                    <Col xs="1"><a href="#" onClick={(e) => this.setSort(e, "goalsPerGame")}>Goals/GP</a></Col>
                    <Col xs="1"><a href="#" onClick={(e) => this.setSort(e, "opponentGAA")}>Opp.GAA</a></Col>
                </Row>
            {
                this.props.players
                    .sort((a, b) => this.sort(a,b))
                    .reverse()
                    .map((player, index) => {
                        return (<Player player={player} key={player.key}/>)                    
                })
            }
            </div>
                )
    }
}

export default PlayerList;