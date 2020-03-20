import React, { Component } from "react";
import "./index.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Fingerprint2 from "fingerprintjs2";
import socketIo from "socket.io-client";

// api-reqs
import { create_new_room, join_room, double_check, get_players, leave_room, check_if_room_exists, change_state } from "./api-reqs";

// modules
import { setRoom, setPlayers, addPlayer, removePlayer } from "../modules/room";
import { setUserBrowserID, setUser, resetUser } from "../modules/user";

// constants
let options = {};

class Setup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            name: "",
            code: "",
        };

    }

    componentDidMount = () => {

        let that = this,
            socket = socketIo("https://www.sitaratas.eu:5000");

        socket.on(`${that.props.match.params.code}_joined`, result => {
            console.log("Someone joined!");
            if (result.data.browser_id !== that.props.user.browser_id) {
                that.props.addPlayer(result.data);
            }
        });

        socket.on(`${that.props.match.params.code}_left`, result => {
            console.log("Someone left!");
            if (result.id !== that.props.user.browser_id) {
                that.props.removePlayer(result.id);
            }
        });

        return Fingerprint2.getV18(options, (result) => {
            return that.props.setUserBrowserID(result)
                .then(_ => {
                    return result;
                })
                .then(id => {
                    if (that.props.match.params.code) {
                        return check_if_room_exists(that.props.match.params.code)
                            .then(room => {
                                if (room.data) {
                                    if (room.data.state === "pre") {
                                        return double_check(id, that.props.match.params.code)
                                            .then(result => {
                                                if (result.data) {
                                                    return that.props.setRoom(that.props.match.params.code, room.data.host_browser_id)
                                                        .then(_ => {
                                                            return this.props.setUser(result.data);
                                                        })
                                                        .then(result => {
                                                            return get_players(result.data.browser_id, result.data.room_code)
                                                                .then(players => {
                                                                    return this.props.setPlayers(players.data)
                                                                        .then(_ => {
                                                                            return this.props.history.push(`/waiting/${result.data.room_code}`);
                                                                        });
                                                                });
                                                        });
                                                } else {
                                                    return that.props.setRoom(that.props.match.params.code, room.data.host_browser_id)
                                                }
                                            });
                                    } else if (room.data.state === "board") {
                                        return this.props.history.push(`/board/${room.data.code}`);
                                    } else {    
                                        return this.props.history.push("/");
                                    }
                                } else {
                                    return this.props.history.push("/");
                                }
                            });
                    } else {
                        return this.props.history.push("/");
                    }
                });
        });

    }

    createNewRoom = (id) => {

        return this.setState({ loading: true }, () => {
            return create_new_room(id)
                .then(result => {
                    return this.props.setRoom(result.data.code, id)
                        .then(_ => {
                            return this.setState({ loading: false }, () => {
                                return this.props.history.push(`/setup/${result.data.code}`);
                            });
                        });
                });
        });

    }

    joinRoom = (name, id, code) => {

        return this.setState({ loading: true }, () => {
            return join_room(name, id, code)
                .then(result => {
                    return this.props.setUser(result.data)
                        .then(result => {
                            return get_players(result.data.browser_id, result.data.room_code)
                                .then(players => {
                                    return this.props.setPlayers(players.data);
                                })
                                .then(_ => {
                                    return this.setState({ loading: false }, () => {
                                        return this.props.history.push(`/waiting/${result.data.room_code}`);
                                    });
                                });
                        });
                });
        });

    }

    checkRoom = (id, code) => {

        let that = this;

        return check_if_room_exists(code)
            .then(room => {
                if (room.data) {
                    return double_check(id, code)
                        .then(result => {
                            if (result.data) {
                                return that.props.setRoom(code, room.data.host_browser_id)
                                    .then(_ => {
                                        return this.props.setUser(result.data);
                                    })
                                    .then(result => {
                                        return get_players(result.data.browser_id, result.data.room_code)
                                            .then(players => {
                                                return this.props.setPlayers(players.data)
                                                    .then(_ => {
                                                        return this.props.history.push(`/waiting/${code}`);
                                                    }); 
                                            });
                                    });
                            } else {
                                return that.props.setRoom(code, room.data.host_browser_id)
                                    .then(_ => {
                                        return this.props.history.push(`/setup/${code}`);
                                    });
                            }
                        });
                } else {
                    return alert("No rooms found... Check code");
                }
            });

    }

    startGame = (code) => {

        return change_state(code, "board")
            .then(_ => {
                return this.props.history.push(`/board/${code}`);
            });

    }

    render = () => {

        if (this.props.user.name) {
            return(
                <div className="setup-container">
                    <span className="setup-title">Game code</span>
                    <span className="setup-code">{this.props.room.code}</span>
                    <span className="setup-successful-entry">Welcome, <span style={{color: "tomato"}}>{this.props.user.name}</span></span>
                    <span className="setup-other-players-counter">Other players: {this.props.room.players.length}</span>
                    <div className="setup-other-players-container">
                        {
                            this.props.room.players.map((player, index) => {
                                return <span className="setup-other-players-item" key={index}>{player.name}</span>
                            })
                        }
                    </div>
                    {
                        this.props.room.host_browser_id === this.props.user.browser_id ?
                            <span className="setup-start" onClick={() => this.startGame(this.props.room.code)}>Start game</span>
                        :
                            <span></span>
                    }
                    <span className="setup-leave">Leave</span>
                </div>
            );
        } else if (this.props.room.code) {
            return(
                <div className="setup-container">
                    <span className="setup-title">Game code</span>
                    <span className="setup-code">{this.props.room.code}</span>
                    <input type={"text"} value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} placeholder={"Name"} className="setup-code-input" />
                    {
                        !this.state.loading ?
                            <span className="setup-enter" style={{cursor: "pointer"}} onClick={() => this.joinRoom(this.state.name, this.props.user.browser_id, this.props.room.code)}>Ready</span>
                        :
                            <span className="setup-enter">Joining...</span>
                    }
                </div>
            );
        } else {
            return(
                <div className="setup-container">
                    <span className="setup-title">Sitaratas</span>
                    <input type={"text"} value={this.state.code} onChange={(e) => this.setState({ code: e.target.value })} placeholder={"Game code"} className="setup-code-input" />
                    <span onClick={() => this.checkRoom(this.props.user.browser_id, this.state.code)} className="setup-enter" style={{cursor: "pointer"}}>Enter game</span>
                    {
                        !this.state.loading ?
                            <span onClick={() => this.createNewRoom(this.props.user.browser_id)} className="setup-create" style={{cursor: "pointer"}}>Create new game</span>
                        :
                            <span className="setup-create" style={{color: "tomato"}}>Creating...</span>
                    }
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
        ...bindActionCreators({ setRoom, setUserBrowserID, setUser, setPlayers, resetUser, addPlayer, removePlayer }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setup);