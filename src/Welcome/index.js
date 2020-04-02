import React, { Component } from "react";
import "./index.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Page from "../Page";

// modules
import { setUser } from "../modules/user";
import { setRoom, setRoomWithPlayers } from "../modules/room";

// api-requests
import { check_my_waiting_status } from "../api-requests/global";
import { create_new_room } from "./api-requests";

class Welcome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            code: "",
            entering: false,
            creating: false,
        };

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

    render = () => {

        if (this.props.user.browser_id) {
            return(
                <Page>
                    <div className="welcome-action-container">
                        <div className="welcome-action-navigation-container">
                            <span>Sitaratas</span>
                        </div>
                        <div className="welcome-action-wrapper">
                            <input type={"text"} value={this.state.code} onChange={(e) => this.setState({ code: e.target.value })} placeholder={"Mängu kood"} className="welcome-action-game-code-input" />
                            {
                                !this.state.entering ?
                                    <div onClick={() => this.enterRoom(this.state.code, this.props.user.browser_id)} className="welcome-action-enter-game-button">
                                        <span>Sisene mängu</span>
                                    </div>
                                :
                                    <div className="welcome-action-enter-game-button">
                                        <img src={require("../media/svgs/loading-fat.svg")} alt="" />
                                    </div>
                            }
                            {
                                !this.state.creating ?
                                    <span onClick={() => this.createNewRoom(this.props.user.browser_id)} className="welcome-action-create-game-button">Uus mäng</span>
                                :
                                    <img className="welcome-action-create-game-loading" src={require("../media/svgs/loading-fat.svg")} alt="" />
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
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({ setUser, setRoom, setRoomWithPlayers }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);