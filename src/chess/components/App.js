import React, {Component} from 'react';
import '../../index.css';
import P_V_AI from "./P_V_AI";
import P_V_P from "./P_V_P";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.P_V_P = true;
        this.player = 1;
    }

    render() {
        if (this.P_V_P) {
            return <P_V_P player={this.player}/>;
        }
        else {
            return <P_V_AI player={this.player}/>;
        }
    }
}
