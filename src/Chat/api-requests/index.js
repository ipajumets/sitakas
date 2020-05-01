// Send message
export let sendMessage = (message, uid, rid, name) => {

    let body = {
        rid: rid,
        uid: uid,
        name: name,
        text: message,
    };

    let request = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };

    return fetch("https://www.sitaratas.eu/api/messages/add-message", request)
        .then(res => res.json())
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
            return;
        });

}

// Get all messages
export let getMessages = (rid) => {

    return fetch("https://www.sitaratas.eu/api/messages/all-for/"+rid)
        .then(res => res.json())
        .then(json => {
            return json.data;
        })
        .catch(err => console.log(err));

}