import React, { Component } from "react";
import "./index.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Fingerprint2 from "fingerprintjs2";
import { isMobileSafari } from "react-device-detect";

// modules
import { setUserBrowserID, setUser } from "../modules/user";
import { setRoom, setRoomWithPlayers } from "../modules/room";

// api-requests
import { create_new_room, check_if_room_exists } from "./api-requests";
import { check_my_setup_status } from "../Setup_v2/api-requests";

// constants
let options = {};

class Welcome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            code: "",
            entering: false,
            creating: false,
            loading: true,
        };

    }

    componentDidMount = () => {

        let that = this;

        return Fingerprint2.getV18(options, (result) => {
            return that.props.setUserBrowserID(result)
                .then(_ => {
                    return this.setState({ loading: false });
                });
        });

    }

    createNewRoom = (host_id) => {

        return this.setState({ creating: true }, () => {
            return create_new_room(host_id)
                .then(room => {
                    return this.props.setRoom(room.data.code, room.data.host_browser_id)
                        .then(_ => {
                            return this.setState({ creating: false }, () => {
                                return this.props.history.push(`/setup/${room.data.code}`);
                            });
                        });
                });
        });

    }

    enterRoom = (code, id) => {

        return this.setState({ entering: true }, () => {
            return check_if_room_exists(code)
                .then(room => {
                    if (room.data) {
                        if (room.data.state !== "game_on") {
                            return check_my_setup_status(id, code)
                                .then(result => {
                                    if (result.success) {
                                        return this.props.setRoomWithPlayers(result.room.code, result.room.host_browser_id, result.players)
                                            .then(_ => {
                                                return;
                                            })
                                            .then(_ => {
                                                return this.props.setUser(result.user)
                                                    .then(_ => {
                                                        return this.props.history.push(`/waiting/${code}`);
                                                    });
                                            });
                                    } else {
                                        return this.props.setRoom(code, room.data.host_browser_id)
                                            .then(_ => {
                                                return this.props.history.push(`/setup/${code}`);
                                            });
                                    }
                                });
                        } else {
                            return this.props.history.push(`/game/${room.data.code}`);
                        }
                    } else {
                        return this.setState({ entering: false }, () => {
                            return alert("Game code invalid, game not found.");
                        });
                    }
                });
        });

    }

    render = () => {

        if (!this.state.loading) {
            return(
                <div className="welcome-action-container">
                    <div className="welcome-action-navigation-container">
                        <span>Sitaratas </span>
                    </div>
                    <div className="welcome-action-wrapper">
                        <input type={"text"} value={this.state.code} onChange={(e) => this.setState({ code: e.target.value })} placeholder={"Game code"} className="welcome-action-game-code-input" />
                        {
                            !this.state.entering ?
                                <div onClick={() => this.enterRoom(this.state.code, this.props.user.browser_id)} className="welcome-action-enter-game-button">
                                    <span>Enter game</span>
                                </div>
                            :
                                <div className="welcome-action-enter-game-button">
                                    <img src={require("../media/svgs/loading-fat.svg")} />
                                </div>
                        }
                        {
                            !this.state.creating ?
                                <span onClick={() => this.createNewRoom(this.props.user.browser_id)} className="welcome-action-create-game-button">Create new game</span>
                            :
                                <img className="welcome-action-create-game-loading" src={require("../media/svgs/loading-fat.svg")} />
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
            );
        } else {
            return(
                <div className="welcome-loading-container">
                    <div className="welcome-action-navigation-container">
                        <span>Sitaratas </span>
                    </div>
                </div>
            );
        }

    }

}

let mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({ setUserBrowserID, setUser, setRoom, setRoomWithPlayers }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);