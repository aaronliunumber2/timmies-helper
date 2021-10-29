import React, { Component } from 'react'
import { Collapse } from 'react-bootstrap'
import PlayerList from './PlayerList'

class PlayerLists extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showList: [],
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
        this.setState({ showList : newShowList });
    }

    render() {
        return (
            <div>
                    {

                        this.props.playerLists.map((set) => {
                            return (
                                <div className="player-list" key={set.id}>
                                    <h2 className='list-header' ><a href={"#set" + set.id} onClick={(e) => this.clickHeader(set.id)}>{(this.state.showList[set.id-1]) ? "-" : "+"}List {set.id}</a></h2>
                                    <Collapse in={this.state.showList[set.id - 1]}>
                                        <div className='stats-list' id={"#set" + set.id}>
                                            <PlayerList data={set.players} columns={this.props.playerListColumns}/>
                                        </div>
                                    </Collapse>
                                </div>
                            )
                        })
                    }
            </div>
            )
        }
    }
    
export default PlayerLists;