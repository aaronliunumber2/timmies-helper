import React, { Component } from 'react'
import PlayerList from './PlayerList'

class PlayerLists extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div> Player Lists</div>
                <ul>
                    {
                        this.props.sets.map((set) => {
                            return(
                                <li>
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