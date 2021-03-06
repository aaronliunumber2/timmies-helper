import React, { Component } from 'react'
import PlayerList from './PlayerList'

class PlayerLists extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showList: []
        };

        this.clickHeader = this.clickHeader.bind(this);
    }

    componentDidMount() {
        //initialize the showList array
        let showList = [];
        for (let i = 0; i < this.props.playerLists.length; i++) {
            showList = [...showList, true];
        }

        this.setState({ showList });
    }


    clickHeader(id) {
        //shallow copy of entire array
        let newShowList = [...this.state.showList];
        let show = newShowList[id - 1];
        newShowList[id - 1] = !show;
        console.log(newShowList);
        this.setState({ showList : newShowList });
    }

    render() {
        return (
            <div>
                <ul>
                    {
                        this.props.playerLists.map((set) => {
                            return(
                                <li className='app-list' key={set.id} >
                                    <h2 className='list-header' onClick={(e) => this.clickHeader(set.id)}><a href="#">List {set.id}</a></h2>
                                    <div>
                                        {this.state.showList[set.id-1] && <PlayerList players={set.players} games={this.props.games} teams={this.props.teams} />}
                                    </div>
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