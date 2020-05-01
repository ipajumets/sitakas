import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import io from "socket.io-client";
import "./index.css";

// Modules
import { setMessages, addMessage } from "../modules/chat";
import { sendMessage, getMessages } from "./api-requests";
import { handleBottomMargin, handleMessageName } from "./helpers";

class Chat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: "",
        };

    }

    componentDidMount = () => {

        this.socket = io("https://www.sitaratas.eu:5000/");

        this.receiveSockets(this.props.rid, this.props.uid);

        return getMessages(this.props.rid)
            .then(result => {
                return this.props.setMessages(result)
                    .then(_ => {
                        let chat = document.getElementById("chat"),
                            chatHeight = chat.scrollHeight;
                        return chat.scroll(0, chatHeight);
                    });
            });

    }

    componentWillUnmount = () => {

        this.socket.close();

    }

    receiveSockets = (code, id) => {

        this.socket.on(`message_${code}`, result => {
            if (result.uid !== id) {
                return this.props.addMessage(result)
                    .then(_ => {
                        let chat = document.getElementById("chat"),
                            chatHeight = chat.scrollHeight;
                        return chat.scroll(0, chatHeight);
                    });
            }
        });

        this.socket.on("connect", () => {
            return getMessages(code)
                .then(result => {
                    return this.props.setMessages(result)
                        .then(_ => {
                            let chat = document.getElementById("chat"),
                                chatHeight = chat.scrollHeight;
                            return chat.scroll(0, chatHeight);
                        });
                });
        });

    }

    renderMessages = (messages, uid) => {

        return messages.map((message, index) => {

            if (message.uid !== uid) {
                return(
                    <div className="chat-messages-item-container" style={{marginBottom: handleBottomMargin(index, messages, message, uid)}} key={index}>
                        {handleMessageName(index, messages, message, uid)}
                        <div className="chat-messages-bubble-container">
                            <div className="chat-messages-bubble-wrapper">
                                {message.text}
                            </div>
                        </div>
                    </div>
                );
            } else {
                return(
                    <div className="chat-messages-me-item-container" style={{marginBottom: handleBottomMargin(index, messages, message, uid)}} key={index}>
                        {handleMessageName(index, messages, message, uid)}
                        <div className="chat-messages-bubble-container">
                            <div className="chat-messages-me-bubble-wrapper">
                                {message.text}
                            </div>
                        </div>
                    </div>
                );
            }
        });

    }

    handleKeyPress = (event, message, uid, rid, players, game) => {

        let code = event.keyCode || event.which;

        if(code === 13) {
            return this.handleMessage(message, uid, rid, players, game);
        }

    }

    handleMessage = (message, uid, rid, players, game) => {

        let filtered;
        filtered = players.filter(player => player.browser_id === uid);

        if(filtered.length < 1) {
            filtered = players.filter(player => player.uid === uid);
        }

        if(filtered.length < 1) {
            if (game && game.players && game.players.length > 0) {
                filtered = game.players.filter(player => player.uid === uid);
            }
        }

        if (filtered.length < 1) {
            return alert("Mida läks untsu! Värskenda igaks juhuks brauserit...");
        }

        let name = filtered[0].name;

        return this.props.addMessage({ rid: rid, uid: uid, name: name, text: message })
            .then(_ => {
                return this.setState({ message: "" }, () => {

                    let chat = document.getElementById("chat"),
                        chatHeight = chat.scrollHeight;

                    chat.scroll(0, chatHeight);

                    return sendMessage(message, uid, rid, name);
                });
            });

    }

    render = () => {

        if (!this.props.chat.fetching) {
            return(
                <div className="chat-container">
                    <div className="chat-navigation-container">
                        <div className="chat-navigation-wrapper">
                            <span className="chat-title">Prügijutu nurgake</span>
                            <span className="chat-subtitle">{this.props.chat.data.length < 1 ? "Ühtegi prügijuttu ei leitud" : `${this.props.chat.data.length} ${this.props.chat.data.length === 1 ? "prügijutt" : "prügijuttu"}`}</span>
                        </div>
                    </div>
                    <div className="chat-messages-container" id="chat">
                        {this.renderMessages(this.props.chat.data, this.props.uid)}
                    </div>
                    <div className="chat-input-container">
                        <input type="text" placeholder={"Sisesta prügijutt siia"} value={this.state.message} onChange={(e) => this.setState({ message: e.target.value })} onKeyPress={(e) => this.handleKeyPress(e, this.state.message, this.props.uid, this.props.rid, this.props.room.players, this.props.game.data)} />
                        <div className="chat-input-button-container" onClick={() => this.handleMessage(this.state.message, this.props.uid, this.props.rid, this.props.room.players, this.props.game.data)}> 
                            <img src={require("../media/svgs/interface.svg")} alt="" />
                        </div>
                    </div>
                </div>
            );
        } else {
            return(
                <div className="chat-container">
                    <div className="chat-navigation-container">
                        <div className="chat-navigation-wrapper">
                            <span className="chat-title">Prügijutu nurgake</span>
                        </div>
                    </div>
                    <div className="chat-loading-container">
                        <img src={require("../media/svgs/loading-chat.svg")} alt="" />
                    </div>
                </div>
            );
        }

    }

}

let mapStateToProps = (state) => {
    return {
        chat: state.chat,
        room: state.room,
        game: state.game,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({ setMessages, addMessage }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);