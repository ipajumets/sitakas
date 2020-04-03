import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isMobileSafari } from "react-device-detect";
import Page from "../Page";

// api-requests
import { check_my_waiting_status } from "../api-requests/global";
import { leave_room, create_new_game } from "./api-requests";

// css
import "./index.css";

// modules
import { setRoomWithPlayers, resetRoom, addPlayer, removePlayer } from "../modules/room";
import { setUserBrowserID, setUser, resetUser } from "../modules/user";

class Setup_v2 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            starting: false,
            leaving: false,
            init: false,
        };

    }

    componentDidMount = () => {

        let that = this,
            room_code = that.props.match.params.code ? that.props.match.params.code : this.props.room.code;

        that.receiveSockets(room_code, that.props.user.browser_id);
        that.handleWaitingStatus(that.props.user.browser_id, room_code);

    }

    handleWaitingStatus = (id, code) => {

        if (!this.state.init) {
            return this.setState({ init: true }, () => {
                return check_my_waiting_status(id, code)
                    .then(result => {
                        if (result.room) {
                            if (result.user) {
                                if (result.room.state === "game_on") {
                                    return this.props.history.push(`/game/${code}`);
                                } else {
                                    return this.setState({ init: false }, () => {
                                        return this.props.setRoomWithPlayers(result.room.code, result.room.host_browser_id, result.players)
                                            .then(_ => {
                                                return this.props.setUser(result.user);
                                            });
                                    });
                                }
                            } else {
                                return this.props.history.push(`/setup/${code}`);
                            }
                        } else {
                            return this.setState({ init: false }, () => {
                                return this.props.history.push("/");
                            });
                        }
                    });
            });
        }

    }

    receiveSockets = (code, id) => {

        this.props.socket.channel.on(`${code}_joined`, result => {
            this.props.addPlayer(result.data);
        });

        this.props.socket.channel.on(`${code}_left`, result => {
            this.props.removePlayer(result.data.id);
        });

        this.props.socket.channel.on(`${code}_new_host`, result => {
            this.props.removePlayer(result.data.id)
                .then(_ => {
                    this.handleWaitingStatus(id, code);
                });
        });

        this.props.socket.channel.on(`${code}_started`, result => {
            this.props.history.push(`/game/${result.code}`);
        });

        this.props.socket.channel.on("connect", () => {
            this.handleWaitingStatus(id, code);
        });


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

        if (players.length === 3 || players.length === 4 || players.length === 5 || players.length === 6) {
            return create_new_game(code);
        } else {
            return alert("3 kuni 6 mängijat võib olla ühes mängus");
        }

    }

    render = () => {

        if (this.props.room.code) {
            return(
                <Page title={`${this.props.room.code}`}>
                    <div className="waiting-action-container">
                        <div className="waiting-action-navigation-container">
                            <span>Sitaratas</span>
                        </div>
                        <div className="waiting-action-wrapper">
                            <span className="waiting-action-game-code-title">MÄNGU KOOD</span>
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
                                            <span>Alusta mängu</span>
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
                                    <span onClick={() => this.leaveRoom(this.props.room.code, this.props.user.browser_id)} className="waiting-action-create-game-button">Lahku mängust</span>
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
                </Page>
            );
        } else {
            return(
                <Page>
                    <div className="waiting-loading-container">
                        <div className="waiting-action-navigation-container">
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
        socket: state.socket,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({ setRoomWithPlayers, resetRoom, addPlayer, removePlayer, setUserBrowserID, setUser, resetUser }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setup_v2);