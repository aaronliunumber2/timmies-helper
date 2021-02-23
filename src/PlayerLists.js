import React, { Component } from 'react'
import PlayerList from './PlayerList'

class PlayerLists extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ul>
                    {
                        this.props.sets.map((set) => {
                            return(
                                <li className='app-list'>
                                <h2>List {set.id}</h2>
                                <PlayerList players={set.players} />
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            )
        }
    }
    
export default PlayerLists;