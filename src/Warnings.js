import React, { Component } from 'react'

export default function Warnings(props) {

    const postponedGamesWarning = props.postponedGames.map((game) =>
        <div key={game.gamePK}>
            POSTPONED: {game.teams.away.team.name} vs {game.teams.home.team.name}
        </div>
    )

    let playerInjuries;
    if (props.injuries) {
        playerInjuries = props.injuries.map((injury) => 
            <div key={injury.ID}>
                INJURY: {injury.player} - {injury.status} - {injury.injury}
            </div>
        )
    }

    return (
        <div className="warnings">
            {postponedGamesWarning}
            {playerInjuries}
        </div>
        )
}

