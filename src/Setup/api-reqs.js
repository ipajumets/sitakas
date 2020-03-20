export let create_new_room = (id) => {

    let body = {
        id: id,
    };

    let request = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    }

    return fetch("https://www.sitaratas.eu/api/rooms/create-new-room", request)
        .then(res => res.json())
        .then(json => {
            return json;
        })
        .catch(err => {
            return alert(err);
        });

}

export let join_room = (name, id, code) => {

    let body = {
        id: id,
        code: code,
        name: name,
    };

    let request = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };

    return fetch("https://www.sitaratas.eu/api/users/join-room", request)
        .then(res => res.json())
        .then(json => {
            return json;
        })
        .catch(err => {
            return alert(err);
        });

}

export let double_check = (id, code) => {

    let body = {
        id: id,
        code: code,
    };

    let request = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };

    return fetch("https://www.sitaratas.eu/api/users/double-check", request)
        .then(res => res.json())
        .then(json => {
            return json;
        })
        .catch(err => {
            return alert(err);
        });

}

export let get_players = (id, code) => {

    let body = {
        id: id,
    };

    let request = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };

    return fetch("https://www.sitaratas.eu/api/users/get-players/"+code, request)
        .then(res => res.json())
        .then(json => {
            return json;
        })
        .catch(err => {
            return alert(err);
        });

}

export let leave_room = (id, code) => {

    let body = {
        id: id,
    };

    let request = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };

    return fetch("https://www.sitaratas.eu/api/users/leave-room/"+code, request)
        .then(res => res.json())
        .then(json => {
            return json;
        })
        .catch(err => {
            return alert(err);
        });

}

export let check_if_room_exists = (code) => {

    return fetch("https://www.sitaratas.eu/api/rooms/check/"+code)
        .then(res => res.json())
        .then(json => {
            return json;
        })
        .catch(err => {
            return alert(err);
        });

}

export let change_state = (code, state) => {

    let body = {
        state: state,
    };

    let request = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };

    return fetch("https://www.sitaratas.eu/api/rooms/change-state/"+code, request)
        .then(res => res.json())
        .then(json => {
            return json;
        })
        .catch(err => {
            return alert(err);
        });

}