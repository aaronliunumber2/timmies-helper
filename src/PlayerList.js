import React, { Component } from 'react'
import Player from './Player'

class PlayerList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<ul>
            {
                this.props.players
                    .sort((a, b) => (a.nhldata ? a.nhldata.goals : 0) - (b.nhldata ? b.nhldata.goals : 0))
                    .reverse()
                    .map((player, index) => {
                    return (<li className='app-list'  key={player.key}><Player player={player} /></li>)
                    
                })
            }
        </ul>)
    }
}

export default PlayerList;