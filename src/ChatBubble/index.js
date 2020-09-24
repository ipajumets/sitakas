import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import io from "socket.io-client";

// css
import "./index.css";

// api-requests
import { getMessages } from "../Chat/api-requests";

// modules
import { toggleMobileChat, setMessages, addMessage, setNewMessageAlert } from "../modules/chat";

class ChatBubble extends Component {

    componentDidMount = () => {

        this.socket = io("https://www.sitaratas.eu:5000/");

        this.receiveSockets(this.props.rid, this.props.uid);

        return getMessages(this.props.rid)
            .then(result => {
                return this.props.setMessages(result);
            });

    }

    receiveSockets = (code, id) => {

        this.socket.on(`message_${code}`, result => {
            if (result.uid !== id) {
                return this.props.addMessage(result);
            }
        });

        this.socket.on("connect", () => {
            return getMessages(code)
                .then(result => {
                    return this.props.setMessages(result);
                });
        });

    }

    componentWillUnmount = () => {

        this.socket.close();

    }

    openChat = () => {

        return this.props.toggleMobileChat()
            .then(_ => {
                return this.props.setNewMessageAlert(false);
            });

    }

    render = () => {

        return(
            <div className="chat-bubble-container" onClick={() => this.openChat()}>
                <img src={require("../media/svgs/chat.svg")} alt="" />
                {
                    this.props.chat.alert ?
                        <div className="chat-bubble-last-message-container">
                        </div>
                    :
                        <div></div>
                }
            </div>
        );

    }

}

let mapStateToProps = (state) => {
    return {
        chat: state.chat,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({ setNewMessageAlert, toggleMobileChat, setMessages, addMessage }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBubble);