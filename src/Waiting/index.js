import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isMobileSafari, isMobile } from "react-device-detect";
import io from "socket.io-client";
import Page from "../Page";

// api-requests
import { check_my_waiting_status } from "../api-requests/global";
import { leave_room, create_new_game, update_privacy, update_max_players, update_isReady, update_jokers, update_sport } from "./api-requests";

// css
import "./index.css";

// modules
import { setRoomWithPlayers, resetRoom, addPlayer, setPlayers, removePlayer, setPrivacy, setJokers, setMaxPlayers, setSport } from "../modules/room";
import { setUserBrowserID, setUser, resetUser, setUserStatus, setLanguage } from "../modules/user";

//  helpers
import { allReady } from "./helpers";

// components
import Chat from "../Chat";
import ChatBubble from "../ChatBubble";
import MobileChat from "../MobileChat";
import Coffee from "../Coffee";
import Language from "../Language";

import { lang } from "../lang";

class Setup_v2 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            starting: false,
            leaving: false,
            init: false,
            width: 0,
        };

    }

    componentDidMount = () => {

        this.socket = io("https://www.sitaratas.eu:5000/");

        let that = this,
            room_code = that.props.match.params.code ? that.props.match.params.code : this.props.room.code;

        that.receiveSockets(room_code, that.props.user.browser_id);
        that.handleWaitingStatus(that.props.user.browser_id, room_code);

        that.setState({ width: document.body.clientWidth }, () => {
            window.addEventListener("resize", () => {
                this.setState({width: document.body.clientWidth});
            });
        });

    }

    componentWillUnmount = () => {

        this.socket.close();

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
                                        return this.props.setRoomWithPlayers(result.room, result.players)
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

        this.socket.on(`${code}_joined`, result => {
            this.props.addPlayer(result.data);
        });

        this.socket.on(`${code}_left`, result => {
            this.props.removePlayer(result.data.id);
        });

        this.socket.on(`${code}_new_host`, result => {
            this.props.removePlayer(result.data.id)
                .then(_ => {
                    this.handleWaitingStatus(id, code);
                });
        });

        this.socket.on(`${code}_privacy_updated`, result => {
            this.props.setPrivacy(result.privacy);
        });

        this.socket.on(`${code}_jokers_updated`, result => {
            this.props.setJokers(result.jokers);
        });

        this.socket.on(`${code}_sport_updated`, result => {
            this.props.setSport(result.sport);
        });

        this.socket.on(`${code}_max_players_updated`, result => {
            this.props.setMaxPlayers(result.amount);
        });

        this.socket.on(`${code}_player_status_updated`, result => {
            this.props.setPlayers(result.players);
        });

        this.socket.on(`${code}_started`, result => {
            this.props.history.push(`/game/${result.code}`);
        });

        this.socket.on("connect", () => {
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

        if (players.length === this.props.room.maxPlayers) {

            let ready = allReady(players);

            if (ready) {
                return create_new_game(code);
            } else {
                return alert("Kõik mängijad ei ole veel valmis");
            }

        } else {

            let short = this.props.room.maxPlayers - players.length,
                word = short > 1 ? "mängijat" : "mängija";

            if (short < 0) {
                return alert(`${Math.abs(short)} ${word} on rohkem!`);
            } else {
                return alert(`${short} ${word} on puudu!`);
            }

        }

    }

    handleReady = (rid, uid, status) => {

        return this.props.setUserStatus(status)
            .then(_ => {
                return update_isReady(rid, uid, status);
            });

    }

    setPrivacy = (rid, privacy) => {

        return this.props.setPrivacy(privacy)
            .then(_ => {
                return update_privacy(rid, privacy);
            });

    }

    setJokers = (rid, jokers) => {

        return this.props.setJokers(jokers)
            .then(_ => {
                return update_jokers(rid, jokers);
            });

    }

    setMaxPlayers = (rid, amount) => {

        return this.props.setMaxPlayers(amount)
            .then(_ => {
                return update_max_players(rid, amount);
            });

    }

    setSport = (rid, sport) => {

        return this.props.setSport(sport)
            .then(_ => {
                return update_sport(rid, sport);
            });

    }

    handlePlayerStatus = (player, room) => {

        if (player.uid === room.host_browser_id) {
            return require("../media/svgs/star.svg");
        }

        if (player.browser_id === room.host_browser_id) {
            return require("../media/svgs/star.svg");
        }

        if (player.isReady) {
            return require("../media/svgs/basketball.svg");
        }

        return require("../media/svgs/sleep.svg");
        

    }

    render = () => {

        if (this.props.room.code) {
            return(
                <Page title={`${this.props.room.code}`}>
                    <div className="waiting-action-and-chat-container">
                        {
                            this.state.width >= 960 ?
                                <Chat uid={this.props.user.browser_id} rid={this.props.room.code} />
                            :
                                <div></div>
                        }
                        <div className="waiting-action-container">
                            {
                                this.state.width > 960 ?
                                    <div className="waiting-action-navigation-center-container">
                                        <div className="waiting-action-navigation-side-container">
                                            <Coffee title={lang.coffee[this.props.user.language]} />                             
                                        </div>
                                        <div className="waiting-action-navigation-middle-container">
                                            <span>{lang.title[this.props.user.language]}</span>
                                        </div>
                                        <div className="waiting-action-navigation-side-container" style={{justifyContent: "flex-end"}}>
                                            <Language setLanguage={this.props.setLanguage} language={this.props.user.language} />
                                        </div>
                                    </div>
                                :
                                    <div className="waiting-action-navigation-center-container">
                                        <div className="waiting-action-navigation-side-container">
                                            <Coffee hide={true} title={lang.coffee[this.props.user.language]} />
                                            <div style={{width: 15}}></div>
                                            <Language hide={true} setLanguage={this.props.setLanguage} language={this.props.user.language} />                          
                                        </div>
                                        <div className="waiting-action-navigation-middle-container">
                                            <span>{lang.title[this.props.user.language]}</span>
                                        </div>
                                        <div className="waiting-action-navigation-side-container" style={{justifyContent: "flex-end", paddingRight: 0}}>
                                            <ChatBubble uid={this.props.user.browser_id} rid={this.props.room.code} />
                                        </div>
                                    </div>
                            }
                            <div className="waiting-action-wrapper">
                                {
                                    isMobile && this.props.room.host_browser_id === this.props.user.browser_id ?
                                        <div className="ios-safari-bottom">
                                        </div>
                                    :
                                        <div></div>
                                }
                                <span className="waiting-action-game-code-title">{lang.gameCode[this.props.user.language]}</span>
                                <span className="waiting-action-game-code">{this.props.room.code}</span>
                                <div className="waiting-action-names-list">
                                    {this.props.room.players.map((player, index) => {
                                        return(
                                            <div key={index} className="waiting-action-names-list-item-container">
                                                <span>{player.name}</span>
                                                <img className="player-title-image" src={this.handlePlayerStatus(player, this.props.room)} alt="" />
                                            </div>
                                        );
                                    })}
                                </div>
                                {
                                    this.props.room.host_browser_id === this.props.user.browser_id ?
                                        <div className="waiting-host-actions-container">
                                            <div className="waiting-host-actions-privacy-title-container">
                                                <p>{lang.privacy[this.props.user.language]}</p>
                                            </div>
                                            <div className="waiting-host-actions-privacy-container">
                                                <div onClick={() => this.setPrivacy(this.props.room.code, "private")} className="waiting-host-actions-privacy-item-container" style={{backgroundColor: this.props.room.privacy === "private" ? "#5386E4" : "transparent"}}>
                                                    <span>{lang.private[this.props.user.language]}</span>
                                                </div>
                                                <div className="waiting-host-actions-privacy-separator"></div>
                                                <div onClick={() => this.setPrivacy(this.props.room.code, "public")} className="waiting-host-actions-privacy-item-container" style={{backgroundColor: this.props.room.privacy === "public" ? "#5386E4" : "transparent"}}>
                                                    <span>{lang.public[this.props.user.language]}</span>
                                                </div>
                                            </div>
                                            <div className="waiting-host-actions-privacy-title-container">
                                                <p>{lang.gameType[this.props.user.language]}</p>
                                            </div>
                                            <div className="waiting-host-actions-privacy-container">
                                                <div onClick={() => this.setJokers(this.props.room.code, false)} className="waiting-host-actions-privacy-item-container" style={{backgroundColor: !this.props.room.jokers ? "#5386E4" : "transparent"}}>
                                                    <span>{lang.classic[this.props.user.language]}</span>
                                                </div>
                                                <div className="waiting-host-actions-privacy-separator"></div>
                                                <div onClick={() => this.setJokers(this.props.room.code, true)} className="waiting-host-actions-privacy-item-container" style={{backgroundColor: this.props.room.jokers ? "#5386E4" : "transparent"}}>
                                                    <span>{lang.jokers[this.props.user.language]}</span>
                                                </div>
                                            </div>
                                            <div className="waiting-host-actions-max-title-container">
                                                <p>{lang.numberOfPlayers[this.props.user.language]}</p>
                                            </div>
                                            <div className="waiting-host-actions-max-container" style={{marginBottom: 15}}>
                                                <div onClick={() => this.setMaxPlayers(this.props.room.code, 3)} className="waiting-host-actions-max-item-container" style={{backgroundColor: this.props.room.maxPlayers === 3 ? "#5386E4" : "transparent"}}>
                                                    <span>3</span>
                                                </div>
                                                <div className="waiting-host-actions-max-separator"></div>
                                                <div onClick={() => this.setMaxPlayers(this.props.room.code, 4)} className="waiting-host-actions-max-item-container" style={{backgroundColor: this.props.room.maxPlayers === 4 ? "#5386E4" : "transparent"}}>
                                                    <span>4</span>
                                                </div>
                                                <div className="waiting-host-actions-max-separator"></div>
                                                <div onClick={() => this.setMaxPlayers(this.props.room.code, 5)} className="waiting-host-actions-max-item-container" style={{backgroundColor: this.props.room.maxPlayers === 5 ? "#5386E4" : "transparent"}}>
                                                    <span>5</span>
                                                </div>
                                                <div className="waiting-host-actions-max-separator"></div>
                                                <div onClick={() => this.setMaxPlayers(this.props.room.code, 6)} className="waiting-host-actions-max-item-container" style={{backgroundColor: this.props.room.maxPlayers === 6 ? "#5386E4" : "transparent"}}>
                                                    <span>6</span>
                                                </div>
                                            </div>
                                            <div className="waiting-host-actions-max-title-container">
                                                <p>{lang.sport[this.props.user.language]}</p>
                                            </div>
                                            <div className="waiting-host-actions-max-container">
                                                <div onClick={() => this.setSport(this.props.room.code, "basketball")} className="waiting-host-actions-max-item-container" style={{backgroundColor: this.props.room.sport === "basketball" ? "#5386E4" : "transparent"}}>
                                                    <span role="img" aria-label="Koss">🏀</span>
                                                </div>
                                                <div className="waiting-host-actions-max-separator"></div>
                                                <div onClick={() => this.setSport(this.props.room.code, "football")} className="waiting-host-actions-max-item-container" style={{backgroundColor: this.props.room.sport === "football" ? "#5386E4" : "transparent"}}>
                                                    <span role="img" aria-label="Jalka">⚽</span>
                                                </div>
                                                <div className="waiting-host-actions-max-separator"></div>
                                                <div onClick={() => this.setSport(this.props.room.code, "both")} className="waiting-host-actions-max-item-container" style={{backgroundColor: this.props.room.sport === "both" ? "#5386E4" : "transparent"}}>
                                                    <span role="img" aria-label="Mõlemad">🏀 ⚽</span>
                                                </div>
                                            </div>
                                        </div>
                                    :
                                        <div></div>
                                }
                                {
                                    this.props.room.host_browser_id !== this.props.user.browser_id ?
                                        <div className="waiting-action-room-data-container">
                                            <div className="waiting-action-room-data-item-container">
                                                <span>{lang.privacy[this.props.user.language]}:</span>
                                                <strong>{this.props.room.privacy === "private" ? "Satsikas" : "Rahvale"} <span>{this.props.room.sport === "basketball" ? "🏀" : this.props.room.sport === "football" ? "⚽" : "🏀 ⚽"}</span></strong>
                                            </div>
                                            <div className="waiting-action-room-data-item-container">
                                                <span>{lang.numberOfPlayers[this.props.user.language]}:</span> <strong>{this.props.room.maxPlayers}</strong>
                                            </div>
                                        </div>
                                    :
                                        <div></div>
                                }
                                {this.props.room.host_browser_id !== this.props.user.browser_id &&
                                    <div className="waiting-action-room-data-container">
                                        <div className="waiting-action-room-data-item-container">
                                            <span>{lang.gameType[this.props.user.language]}:</span> <strong>{this.props.room.jokers ? lang.jokers[this.props.user.language] : lang.classic[this.props.user.language]}</strong>
                                        </div>
                                    </div>
                                }
                                {
                                    this.props.room.host_browser_id === this.props.user.browser_id ?
                                        !this.state.starting ?
                                            <div onClick={() => this.startGame(this.props.room.code, this.props.room.players)} className="waiting-action-enter-game-button">
                                                <span>{lang.start[this.props.user.language]}</span>
                                            </div>
                                        :
                                            <div className="waiting-action-enter-game-button">
                                                <img src={require("../media/svgs/loading-fat.svg")} alt="" />
                                            </div>
                                    :
                                        <div></div>
                                }
                                {
                                    this.props.room.host_browser_id !== this.props.user.browser_id ?
                                        !this.props.user.isReady ?
                                            <div onClick={() => this.handleReady(this.props.room.code, this.props.user.browser_id, true)} className="waiting-action-ready-game-button">
                                                <span>{lang.iAmReady[this.props.user.language]}</span>
                                            </div>
                                        :
                                            <div onClick={() => this.handleReady(this.props.room.code, this.props.user.browser_id, false)} className="waiting-action-wait-game-button">
                                                <span>{lang.timeOut[this.props.user.language]}</span>
                                            </div>
                                    :
                                        <div></div>
                                }
                                {
                                    !this.state.leaving ?
                                        <span onClick={() => this.leaveRoom(this.props.room.code, this.props.user.browser_id)} className="waiting-action-create-game-button">{lang.leave[this.props.user.language]}</span>
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
                        {
                            this.props.chat.showMobile ?
                                <MobileChat uid={this.props.user.browser_id} rid={this.props.room.code} />
                            :
                                <div></div>
                        }
                    </div>
                </Page>
            );
        } else {
            return(
                <Page>
                </Page>
            );
        }

    }

}

let mapStateToProps = (state) => {
    return {
        room: state.room,
        user: state.user,
        chat: state.chat,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({ setRoomWithPlayers, resetRoom, addPlayer, setPlayers, removePlayer, setUserBrowserID, setUser, resetUser, setPrivacy, setJokers, setMaxPlayers, setUserStatus, setSport, setLanguage }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setup_v2);