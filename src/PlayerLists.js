import React, { Component } from 'react'
import { Collapse } from 'react-bootstrap'
import PlayerList from './PlayerList'

class PlayerLists extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showList: [],
            columns : null
        };

        this.clickHeader = this.clickHeader.bind(this);
    }


    componentDidMount() {
        //initialize the showList array
        let showList = [];
        for (let i = 0; i < this.props.playerLists.length; i++) {
            showList = [...showList, true];
        }

        const columns = [
            {
                Header: " ",
                id: "name",
                columns: [
                    {
                        Header: "Name",
                        id: "playerName",
                        accessor: "shortName",
                        className: "player-name",
                        Cell: props =>
                            <div>
                                <img className="team-logo" src={process.env.PUBLIC_URL + "/assets/logos/" + props.row.original.nhldata.teamAbbrevs + ".png"} /> <a target="_blank" href={"https://www.nhl.com/player/" + props.row.original.key}>{props.value}</a>
                            </div>,
                    },
                    {
                        Header: "Pos",
                        id: "playerPosition",
                        accessor: "position",
                        className: "short-stat"
                    },
                    {
                        Header: "GP",
                        id: "playerGames",
                        accessor: "nhldata.gamesPlayed",
                        className: "short-stat"
                    },
                    {
                        Header: "G",
                        id: "playerGoals",
                        accessor: "nhldata.goals",
                        className: "short-stat"
                    },
                    {
                        Header: "Shots/GP",
                        id: "playerShotsPerGame",
                        accessor: "nhldata.shotsPerGame",
                        className: "long-stat"
                    },
                    {
                        Header: "PP.TOI/GP",
                        id: "playerPPTimePerGame",
                        accessor: "statsdata.powerPlayTimeOnIcePerGame",
                        className: "long-stat"
                    },
                    {
                        Header: "TOI/GP",
                        id: "playerTimePerGame",
                        accessor: "statsdata.timeOnIcePerGame",
                        className: "long-stat"
                    },
                    {
                        Header: "Goals/GP",
                        id: "playerGoalsPerGame",
                        accessor: "nhldata.goalsPerGame",
                        className: "short-stat"
                    },
                    {
                        Header: "Opp.GAA",
                        id: "playerOppGAA",
                        accessor: "opponent.goalsAgainstPerGame",
                        Cell: props => <div><img className="team-logo" src={process.env.PUBLIC_URL + "/assets/logos/" + props.row.original.opponent.teamAbbr + ".png"} /> {props.value.toFixed(2)}</div>,
                        className: "long-stat"
                    }

                ]
            }];

        this.setState({ showList, columns });
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
                                    <h2 className='list-header' ><a href="#" onClick={(e) => this.clickHeader(set.id)}>List {set.id}</a></h2>
                                    <Collapse in={this.state.showList[set.id - 1]}>
                                        <div className='stats-list'>
                                            {this.state.columns && <PlayerList data={set.players} columns={this.state.columns}/>}
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