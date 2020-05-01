import React from "react";

export let handleBottomMargin = (index, messages, message) => {

    if (!messages[index+1]) return 15;

    if (message.uid === messages[index+1].uid) return 0;

    return 15;

}

export let handleMessageName = (index, messages, message, uid) => {

    if (index === 0) {
        return(
            <div className="chat-messages-name-container" style={uid === message.uid ? {marginRight: 5, marginTop: 5} : {marginLeft: 5, marginTop: 5}}>
                <span>{uid === message.uid ? "Legend" : message.name}</span>
            </div>
        );
    }

    if (message.uid === messages[index-1].uid) {
        return <div style={{height: 2}}></div>;
    } else {
        return(
            <div className="chat-messages-name-container" style={uid === message.uid ? {marginRight: 5} : {marginLeft: 5}}>
                <span>{uid === message.uid ? "Legend" : message.name}</span>
            </div>
        );
    }

}