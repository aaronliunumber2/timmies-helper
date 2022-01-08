import React, { Component } from 'react'

class Warnings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showWarnings: true
        };

        this.clickHide = this.clickHide.bind(this);
    }

    clickHide() {
        this.setState({ showWarnings: !this.state.showWarnings });
    }


    render() {
        const postponedGamesWarning = this.props.postponedGames.map((game) =>
            <div key={game.gamePK}>
                POSTPONED: {game.teams.away.team.name} vs {game.teams.home.team.name}
            </div>
        )

        let playerInjuries;
        if (this.props.injuries) {
            playerInjuries = this.props.injuries.map((injury) =>
                <div key={injury.ID}>
                    INJURY: {injury.player} - {injury.status} - {injury.injury}
                </div>
            )
        }

        const otherWarnings = this.props.otherWarnings.map((warning, i) =>
            <div key={i}>
                Warning: {warning}
            </div>
        )

        const hideShow =
            <div onClick={(e) => this.clickHide()}><a href="#">{(this.state.showWarnings) ? "(hide warnings)" : "(show warnings)"}</a></div>

        return (<div className="warnings">
            {this.state.showWarnings && postponedGamesWarning}
            {this.state.showWarnings && playerInjuries}
            {this.state.showWarnings && otherWarnings}
            {((this.props.postponedGames.length > 0) || (this.props.injuries.length > 0) || (this.props.otherWarnings.length > 0)) && hideShow}
        </div>)
    }
}

export default Warnings