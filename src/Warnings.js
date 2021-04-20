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
            <div key={injury.Player.LastName}>
                INJURY: {injury.Player.FirstName} {injury.Player.LastName} : {injury.InjuryDetail.Status} - {injury.InjuryDetail.Description}
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

