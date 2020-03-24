import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isMobileSafari } from "react-device-detect";
import socketIo from "socket.io-client";
import Page from "../Page";

// api-requests
import { check_my_waiting_status } from "../api-requests/global";
import { change_room_state, leave_room, create_new_game } from "./api-requests";

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
        };

    }

    componentDidMount = () => {

        let that = this,
            room_code = that.props.match.params.code ? that.props.match.params.code : this.props.room.code;

        that.receiveSockets(room_code);

        return check_my_waiting_status(that.props.user.browser_id, that.props.match.params.code)
            .then(result => {
                if (result.room) {
                    if (result.user) {
                        if (result.room.state === "game_on") {
                            return that.props.history.push(`/game/${that.props.match.params.code}`);
                        } else {
                            return that.props.setRoomWithPlayers(result.room.code, result.room.host_browser_id, result.players)
                                .then(_ => {
                                    return that.props.setUser(result.user);
                                });
                        }
                    } else {
                        return that.props.history.push(`/setup/${that.props.match.params.code}`);
                    }
                } else {
                    return that.props.history.push("/");
                }
            });

    }

    receiveSockets = (code) => {

        let socket = socketIo("https://www.sitaratas.eu:5000");

        socket.on(`${code}_joined`, result => {
            this.props.addPlayer(result.data);
        });

        socket.on(`${code}_left`, result => {
            this.props.removePlayer(result.data.id);
        });

        socket.on(`${code}_started`, result => {
            this.props.history.push(`/game/${result.code}`);
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

        if (players.length === 4) {
            return create_new_game(code, "game_on", 1, players);
        } else {
            return alert("4 mängijat peab olema ühes mängus");
        }

    }

    render = () => {

        if (this.props.room.code) {
            return(
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
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({ setRoomWithPlayers, resetRoom, addPlayer, removePlayer, setUserBrowserID, setUser, resetUser }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setup_v2);