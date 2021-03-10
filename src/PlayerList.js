import React, { Component } from 'react'
import Player from './Player'
import Container from 'react-bootstrap/Row'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class PlayerList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs="2">Name</Col>
                    <Col xs="1">Pos</Col>
                    <Col xs="1">Games</Col>
                    <Col xs="1">Goals</Col>
                    <Col xs="1">Shots/GP</Col>
                    <Col xs="1">PP.TOI/GP</Col>
                    <Col xs="1">TOI/GP</Col>
                    <Col xs="1">Goals/GP</Col>
                    <Col xs="1">Opp.GAA</Col>
                </Row>
            {
                this.props.players
                    .sort((a, b) => (a.nhldata ? a.nhldata.goals / a.nhldata.gamesPlayed : 0) - (b.nhldata ? b.nhldata.goals / b.nhldata.gamesPlayed : 0))
                    .reverse()
                    .map((player, index) => {
                        let opponent = null;
                        if (player.nhldata) {
                            let playerTeamAbbr = player.nhldata.teamAbbrevs;
                            let playerTeam = this.props.teams.find(team => team.teamAbbr === playerTeamAbbr);
                            if (playerTeam) {
                                let game = this.props.games.find(game => game.teams.home.abbr === playerTeam.timmiesAbbr || game.teams.away.abbr === playerTeam.timmiesAbbr);
                                if (game) {
                                    if (game.teams.home.abbr === playerTeamAbbr) {
                                        opponent = this.props.teams.find(team => team.timmiesAbbr === game.teams.away.abbr);
                                    }
                                    else {
                                        opponent = this.props.teams.find(team => team.timmiesAbbr === game.teams.home.abbr);
                                    }
                                }
                            }
                        }

                        if (!opponent) {
                            if (!player.nhldata) {
                                console.log("No NHL data for " + player.firstName + " " + player.lastName);
                            }
                            else {
                                console.log("Failed to get opponent for " + player.firstName + " " + player.lastName);
                                console.log("Team Abbr: " + player.nhldata.teamAbbrevs);
                            }
                        }

                        return (<Player player={player} opponent={opponent} key={player.key}/>)                    
                })
            }
            </div>
                )
    }
}

export default PlayerList;