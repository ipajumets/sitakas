import React, { Component } from "react";
import io from "socket.io-client";
import Page from "../Page";

// CSS
import "./index.css";

class Counter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            count: 0,
        };

    }

    componentDidMount = () => {

        this.socket = io("https://www.sitaratas.eu:5000/");

        return this.socket.on("count", (result) => {
            return this.setState({ count: result.count });
        }); 

    }

    componentWillUnmount = () => {

        this.socket.close();

    }

    render = () => {

        return(
            <Page title={`${this.state.count} currently connected`}>
                <div className="counter-master-container">
                    <span className="count-number">{this.state.count}</span>
                </div>
            </Page>
        );

    }

}

export default Counter;