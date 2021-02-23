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
                    return (<li className='app-list'><Player playerInfo={player}/></li>)
                })
            }
        </ul>)
    }
}

export default PlayerList;