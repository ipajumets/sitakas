import React, { Component } from "react";
import "./index.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Page from "../Page";

// modules
import { setUser } from "../modules/user";
import { setRoom } from "../modules/room";

// api-requests
import { check_my_waiting_status } from "../api-requests/global";
import { create_new_room, get_public_games } from "./api-requests";

class Welcome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            code: "",
            entering: false,
            creating: false,
            rooms: [],
            isFetching: true,
        };

    }

    componentDidMount = () => {

        this.receiveSockets();

    }

    receiveSockets = () => {

        let that = this;

        that.props.socket.channel.on("refresh_public_rooms_list", _ => {
            get_public_games()
                .then(rooms => {
                    return that.setState({ rooms: rooms });
                });
        });

        that.props.socket.channel.on("connect", () => {
            get_public_games()
                .then(rooms => {
                    return that.setState({ rooms: rooms });
                });
        });

    }

    createNewRoom = (host_id) => {

        return this.setState({ creating: true }, () => {
            return create_new_room(host_id)
                .then(room => {
                    return this.props.setRoom(room.data.code, room.data.host_browser_id);
                })
                .then(result => {
                    return this.setState({ creating: false }, () => {
                        return this.props.history.push(`/setup/${result.code}`);
                    });
                });
        });

    }

    enterRoom = (code, id) => {

        return this.setState({ entering: true }, () => {
            return check_my_waiting_status(id, code)
                .then(result => {
                    if (result.room) {
                        if (result.user) {
                            if (result.room.state === "game_on") {
                                return this.props.history.push(`/game/${code}`);
                            } else {
                                return this.props.history.push(`/waiting/${code}`);
                            }
                        } else {
                            return this.props.history.push(`/setup/${code}`);
                        }
                    } else {
                        return this.setState({ entering: false }, () => {
                            return alert("Vale kood");
                        });
                    }
                });
        });

    }

    handlePlayerNames = (players) => {

        if (players.length < 1) {
            return "";
        } 

        if (players.length === 1) {
            return players[0].name;
        }

        if (players.length === 2) {
            return players[0].name+" ja "+players[1].name;
        }

        let sentence = "";

        players.forEach((player, index) => {
            if ((index+1) === players.length) {
                return sentence = sentence+" ja "+player.name;
            }
            if ((index+1) === (players.length-1)) {
                return sentence = sentence+player.name;
            }
            return sentence = sentence+player.name+", ";
        });

        return sentence;

    }

    renderPublicRooms = (rooms) => {

        return rooms.map((room, index) => {
            return(
                <div key={index} className="public-games-list-item-container" onClick={() => this.enterRoom(room.code, this.props.user.browser_id)}>
                    <div className="public-games-list-item-wrapper">
                        <div className="public-games-list-item-names">
                            <p style={{color: "tomato"}}>{room.created}</p>
                        </div>
                        <div className="public-games-list-item-row">
                            <div className="public-games-list-item-code-container">
                                <span>#{room.code}</span>
                            </div>
                            <div className="public-games-list-item-players-container">
                                <span>{room.players.length}/{room.maxPlayers}</span>
                            </div>
                            <div className="public-games-list-item-join-container">
                                <img src={require("../media/svgs/next.svg")} alt="" />
                            </div>
                        </div>
                        <div className="public-games-list-item-names">
                            <p><strong>Mängijad:</strong> {this.handlePlayerNames(room.players)}</p>
                        </div>
                    </div>
                </div>
            );
        });

    }

    render = () => {

        if (this.props.user.browser_id) {
            return(
                <Page title={"Sitaratas.eu | Kõige parem kaardimäng maailmas"}>
                    <div className="welcome-action-container">
                        <div className="welcome-action-navigation-container">
                            <span>Sitaratas</span>
                        </div>
                        <div className="welcome-action-wrapper">
                            {
                                !this.state.creating ?
                                    <div className="welcome-action-create-new-container" onClick={() => this.createNewRoom(this.props.user.browser_id)}>
                                        <img src={require("../media/svgs/plus.svg")} alt="" />
                                    </div>
                                :
                                    <div className="welcome-action-create-new-container">
                                        <img src={require("../media/svgs/loading-fat.svg")} alt="" />
                                    </div>
                            }
                            <div className="welcome-action-input-container">
                                <input type={"text"} value={this.state.code} onChange={(e) => this.setState({ code: e.target.value })} placeholder={"Mängu kood"} className="welcome-action-game-code-input" />
                            </div>
                            {
                                !this.state.entering ?
                                    <div className="welcome-action-enter-game-container" onClick={() => this.enterRoom(this.state.code, this.props.user.browser_id)}>
                                        <img src={require("../media/svgs/send.svg")} alt="" />
                                    </div>
                                :
                                    <div className="welcome-action-enter-game-container">
                                        <img src={require("../media/svgs/loading-fat.svg")} alt="" />
                                    </div>
                            }
                        </div>
                        <div className="public-games-title-container">
                            <p>Avalikud mängud</p>
                        </div>
                        <div className="public-games-list-container">
                            {
                                this.state.isFetching ?
                                    <p className="public-games-list-idle">Laadimine...</p>
                                :
                                    this.state.rooms.length < 1 ?
                                        <p className="public-games-list-idle">Mänge ei leitud</p>
                                    :
                                        this.renderPublicRooms(this.state.rooms)
                            }
                        </div>
                    </div>
                </Page>
            );
        } else {
            return(
                <Page>
                    <div className="welcome-loading-container">
                        <div className="welcome-action-navigation-container">
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
        user: state.user,
        socket: state.socket,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({ setUser, setRoom }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);