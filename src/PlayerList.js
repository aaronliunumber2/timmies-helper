import React, { Component } from 'react'
import Player from './Player'

class PlayerList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<ul>
            {
                this.props.players.map((player, index) => {
                    return (<li><Player playerInfo={player}/></li>)
                })
            }
        </ul>)
    }
}

export default PlayerList;