import React, { Component } from 'react'
import PlayerLists from './PlayerLists'
import axios from 'axios'

class TimmiesApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            sets: [],
            errorMessage: "",
        }

        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        console.log("Mount timmies app");
        this.loadData();
    }

    loadData() {
        const promise = axios.post("https://cors.bridged.cc/http://ec2-54-158-170-220.compute-1.amazonaws.com/api/v1/players");
        promise.then((response) => {
            this.setState({ sets: response.data.sets, loading: false });
        })
            .catch(() => {
                this.setState({ errorMessage: "Something went wrong" })
            });
    }

    render() {

        let display = <div>ok</div>

        if (this.state.loading) {
            display = <div><img src="https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif" alt="loading..." /></div>
        }
        else if (this.state.errorMessage) {
            display = <div>{this.state.errorMessage}</div>
        }
        else if (!this.state.sets) {
            display = <div>No data available</div>;
        }
        else {
            display = <div><PlayerLists sets={this.state.sets}/></div>
        }
        return (display);
    }
}

export default TimmiesApp;