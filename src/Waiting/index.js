import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isMobileSafari } from "react-device-detect";
import Fingerprint2 from "fingerprintjs2";
import socketIo from "socket.io-client";

// api-requests
import { check_my_waiting_status, change_room_state, leave_room, create_new_game, divide_first_cards } from "./api-requests";

// css
import "./index.css";

// modules
import { setRoomWithPlayers, resetRoom, addPlayer, removePlayer } from "../modules/room";
import { setUserBrowserID, setUser, resetUser } from "../modules/user";

// constants
let options = {};

class Setup_v2 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            starting: false,
            leaving: false,
            loading: true,
        };

    }

    componentDidMount = () => {

        let that = this,
            socket = socketIo("https://www.sitaratas.eu:5000"),
            room_code = that.props.match.params.code ? that.props.match.params.code : this.props.room.code;

        socket.on(`${room_code}_joined`, result => {
            this.props.addPlayer(result.data);
        });

        socket.on(`${room_code}_left`, result => {
            this.props.removePlayer(result.data.id);
        });

        socket.on(`${room_code}_started`, result => {
            this.props.history.push(`/game/${result.code}`);
        });

        if (!this.props.room.code) {

            return Fingerprint2.getV18(options, (result) => {
                return that.props.setUserBrowserID(result)
                    .then(_ => {
                        return result;
                    })
                    .then(browser_id => {
                        return check_my_waiting_status(browser_id, that.props.match.params.code)
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
                                                        return this.setState({ loading: false });
                                                    });
                                            });
                                    } else {
                                        this.props.history.push(`/game/${result.room.code}`);
                                    }
                                } else {
                                    return this.props.history.push("/");
                                }
                            });
                    });
            });

        }

        return this.setState({ loading: false });

    }

    leaveRoom = (code, id) => {

        return this.setState({ leaving: true }, () => {
            return leave_room(id, code)
                .then(result => {
                    if (result.success) {
                        return this.props.resetRoom()
                            .then(_ => {
                                return;
                            })
                            .then(_ => {
                                return this.props.resetUser()
                                    .then(_ => {
                                        return this.props.history.push("/");
                                    });
                            });
                    } else {
                        return this.setState({ leaving: false });
                    }
                });
        });

    }

    startGame = (code, players) => {

        return change_room_state(code, "game_on")
            .then(_ => {
                return;
            })
            .then(_ => {
                return create_new_game(code, players)
                    .then(result => {
                        return divide_first_cards(code, players);
                    });
            });

    }

    render = () => {

        if (!this.state.loading) {
            return(
                <div className="waiting-action-container">
                    <div className="waiting-action-navigation-container">
                        <span>Sitaratas </span>
                    </div>
                    <div className="waiting-action-wrapper">
                        <span className="waiting-action-game-code-title">GAME CODE</span>
                        <span className="waiting-action-game-code">{this.props.room.code}</span>
                        <div className="waiting-action-names-list">
                            {this.props.room.players.map((player, index) => {
                                return(
                                    <span key={index}>{player.name}</span>
                                );
                            })}
                        </div>
                        {
                            this.props.room.host_browser_id === this.props.user.browser_id ?
                                !this.state.starting ?
                                    <div onClick={() => this.startGame(this.props.room.code, this.props.room.players)} className="waiting-action-enter-game-button">
                                        <span>Start game</span>
                                    </div>
                                :
                                    <div className="waiting-action-enter-game-button">
                                        <img src={require("../media/svgs/loading-fat.svg")} alt="" />
                                    </div>
                            :
                                <div></div>
                        }
                        {
                            !this.state.leaving ?
                                <span onClick={() => this.leaveRoom(this.props.room.code, this.props.user.browser_id)} className="waiting-action-create-game-button">Leave room</span>
                            :
                                <img className="waiting-action-create-game-loading" src={require("../media/svgs/loading-fat.svg")} alt="" />
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
                <div className="waiting-loading-container">
                    <div className="waiting-action-navigation-container">
                        <span>Sitaratas </span>
                    </div>
                </div>
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
        ...bindActionCreators({ setRoomWithPlayers, resetRoom, addPlayer, removePlayer, setUserBrowserID, setUser, resetUser }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setup_v2);