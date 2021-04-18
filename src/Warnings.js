import React, { Component } from 'react'

export default function Warnings(props) {

    const postponedGamesWarning = props.postponedGames.map((game) =>
        <div key={game.gamePK}>
            POSTPONED: {game.teams.away.team.name} vs {game.teams.home.team.name}
        </div>
    )

    return (
        <div className="warnings">
            {postponedGamesWarning}
        </div>
        )
}

