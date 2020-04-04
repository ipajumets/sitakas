import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isMobileSafari } from "react-device-detect";
import Page from "../Page";

// css
import "./index.css";

// modules
import { setRoom, setRoomWithPlayers, resetRoom, setPlayers } from "../modules/room";
import { setUser } from "../modules/user";

// api-requests
import { check_my_waiting_status } from "../api-requests/global";
import { join_room } from "./api-requests";

class Setup_v2 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            joining: false,
        };

    }

    componentDidMount = () => {

        let that = this;

        return check_my_waiting_status(that.props.user.browser_id, that.props.match.params.code)
            .then(result => {
                if (result.room) {
                    if (result.user) {
                        if (result.room.state === "game_on") {
                            return that.props.history.push(`/game/${that.props.match.params.code}`);
                        } else {
                            return that.props.history.push(`/waiting/${that.props.match.params.code}`);
                        }
                    } else {
                        return that.props.setRoom(result.room.code, result.room.host_browser_id);
                    }
                } else {
                    return that.props.history.push("/");
                }
            });

    }

    goBack = () => {

        this.props.history.push("/");

        return this.props.resetRoom();

    }

    joinRoom = (name, id, code) => {

        if (name) {
            if (name.length < 25) {
                return this.setState({ joining: true }, () => {
                    return join_room(name, id, code)
                        .then(result => {
                            if (result.user) {
                                return this.props.history.push(`/waiting/${code}`);
                            } else {
                                return this.setState({ joining: false }, () => {
                                    return alert("Mänguga liitumine ebaõnnestus, palun proovige uuesti.");
                                });
                            }
                        });
                });
            } else {
                return alert("Nimi ei tohi olla rohkem kui 24 tähemärki");
            }
        } else {
            return alert("Palun sisesta oma nimi");
        }

    }

    render = () => {

        if (this.props.room.code) {
            return(
                <Page title={`${this.props.room.code}`}>
                    <div className="setup-action-container">
                        <div className="setup-action-navigation-container">
                            <span>Sitaratas</span>
                        </div>
                        <div className="setup-action-wrapper">
                            <span className="setup-action-game-code-title">MÄNGU KOOD</span>
                            <span className="setup-action-game-code">{this.props.room.code}</span>
                            <input type={"text"} value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} placeholder={"Sinu nimi"} className="setup-action-game-code-input" />
                            {
                                !this.state.joining ?
                                    <div onClick={() => this.joinRoom(this.state.name, this.props.user.browser_id, this.props.room.code)} className="setup-action-enter-game-button">
                                        <span>Valmis</span>
                                    </div>
                                :
                                    <div className="setup-action-enter-game-button">
                                        <img src={require("../media/svgs/loading-fat.svg")} alt="" />
                                    </div>
                            }
                            {
                                !this.state.creating ?
                                    <span onClick={() => this.goBack()} className="setup-action-create-game-button">Mine tagasi</span>
                                :
                                    <img className="setup-action-create-game-loading" src={require("../media/svgs/loading-fat.svg")} alt="" />
                            }
                        </div>
                        {
                            isMobileSafari ?
                                <div className="ios-safari-bottom">
                                </div>
                            :
                                <div></div>
                        }
                    </div>
                </Page>
            );
        } else {
            return(
                <Page>
                    <div className="setup-loading-container">
                        <div className="setup-action-navigation-container">
                            <span>Sitaratas</span>
                        </div>
                    </div>
                </Page>
            );
        }

    }

}

let mapStateToProps = (state) => {
    return {
        room: state.room,
        user: state.user,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({ setRoom, setRoomWithPlayers, setPlayers, resetRoom, setUser }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setup_v2);