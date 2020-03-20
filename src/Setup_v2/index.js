import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isMobileSafari } from "react-device-detect";
import Fingerprint2 from "fingerprintjs2";
import Page from "../Page";

// css
import "./index.css";

// modules
import { setRoom, setRoomWithPlayers, resetRoom, setPlayers } from "../modules/room";
import { setUserBrowserID, setUser } from "../modules/user";

// api-requests
import { join_room, check_my_setup_status } from "./api-requests";

// constants
let options = {};

class Setup_v2 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            joining: false,
            loading: true,
        };

    }

    componentDidMount = () => {

        if (!this.props.room.code) {
            
            let that = this;

            return Fingerprint2.getV18(options, (result) => {
                return that.props.setUserBrowserID(result)
                    .then(_ => {
                        return result;
                    })
                    .then(browser_id => {
                        return check_my_setup_status(browser_id, that.props.match.params.code)
                            .then(result => {
                                if (result.success) {
                                    if (result.room.state !== "game_on") {
                                        return this.props.setRoomWithPlayers(result.room.code, result.room.host_browser_id, result.players)
                                            .then(_ => {
                                                return;
                                            })
                                            .then(_ => {
                                                return this.props.setUser(result.user)
                                                    .then(_ => {
                                                        return this.props.history.push(`/waiting/${that.props.match.params.code}`);
                                                    });
                                            });
                                    } else {
                                        return this.props.history.push(`/game/${that.props.match.params.code}`);
                                    }
                                } else {
                                    return this.props.setRoom(that.props.match.params.code, browser_id)
                                        .then(_ => {
                                            return this.setState({ loading: false });
                                        });
                                }
                            });
                    });
            });

        }

        return this.setState({ loading: false });

    }

    goBack = () => {

        this.props.history.push("/");

        return this.props.resetRoom();

    }

    joinRoom = (name, id, code) => {

        if (name) {
            return this.setState({ joining: true }, () => {
                return join_room(name, id, code)
                    .then(result => {
                        return this.props.setUser(result.user)
                            .then(_ => {
                                return;
                            })
                            .then(_ => {
                                return this.props.setPlayers(result.players)
                                    .then(_ => {
                                        return this.props.history.push(`/waiting/${code}`);
                                    });
                            });
                    });
            });
        } else {
            return alert("Please add your name");
        }

    }

    render = () => {

        if (!this.state.loading) {
            return(
                <Page>
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
        ...bindActionCreators({ setRoom, setRoomWithPlayers, setPlayers, resetRoom, setUserBrowserID, setUser }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setup_v2);