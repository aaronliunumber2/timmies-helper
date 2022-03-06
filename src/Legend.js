import React, { Component } from 'react'
import { Collapse } from 'react-bootstrap'

class Legend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showLegend: false
        };

        this.clickHeader = this.clickHeader.bind(this);
    }

    clickHeader() {
        this.setState({ showLegend: !this.state.showLegend });
    }

    render(){
        return (
            <div className="legend" id="legend">
                <div onClick={(e) => this.clickHeader()}><a href="#legend">Legend</a></div>
                <Collapse in={this.state.showLegend} >
                    <div className="legend-content">
                        Pos - Position<br />
                        GP - Games Played<br />
                        G - Goals<br />
                        Shots/GP - Shots per Game Played<br />
                        Shoot% - Percentage of shots that score<br />
                        PP.TOI/GP - Power Play Time on Ice per Game Played<br />
                        TOI/GP - Time on Ice per Game Played<br />
                        Goals/GP - Goals per Game Played<br />
                        H/A - Whether the player is playing at home or away<br />
                        Opp.GAA - Opposition Goals Against Average<br />
                    </div>
                </Collapse>
            </div>
        )
    }
}

export default Legend;