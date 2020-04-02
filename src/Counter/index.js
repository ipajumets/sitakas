import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";
import Page from "../Page";

class Counter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            count: 0,
        };

    }

    componentDidMount = () => {

        return this.props.socket.channel.on("count", (result) => {
            return this.setState({ count: result.count });
        }); 

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

let mapStateToProps = (state) => {
    return {
        socket: state.socket,
    }
}

export default connect(mapStateToProps)(Counter);