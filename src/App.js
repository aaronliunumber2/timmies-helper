import './App.css';
import paypallogo from './paypal.png';
import TimmiesApp from './TimmiesApp'
import Legend from './Legend'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react'
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

class App extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            showMessage: true
        };

        this.clickHeader = this.clickHeader.bind(this);
    }

    clickHeader() {
        this.setState({ showMessage: false });
    }

    render() {
        let message = <div onClick={(e) => this.clickHeader()}><a href="#">The site seems to be stable now.  Good luck everyone!  Click to hide...</a></div>

        return (
            <div className="App">
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
                    integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
                    crossOrigin="anonymous"
                />
                <header className="app-title">
                    Tim Horton's Hockey Challenge Helper
          </header>
                <div>
                    {this.state.showMessage && message}
                    <TimmiesApp cookies={this.props.cookies}/>
                    <Legend />
                    <footer className="footer" >
                        <div>Questions? Suggestions? Find me on <a href={"//www.twitter.com/Zorbane"} target="_blank">Twitter</a></div>
                        <div>Buy me Timmies? <a href='https://www.paypal.com/paypalme/zorbane/' target="_blank"><img className="paypal-logo" src={paypallogo} /></a></div>
                    </footer>
                </div>
            </div>
        );
    }
}

export default withCookies(App);
