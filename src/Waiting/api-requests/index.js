// Create  new game and start
export let create_new_game = (code) => {

    return fetch("https://www.sitaratas.eu/api/games/create-game/"+code)
        .then(res => res.json())
        .then(json => {
            return json;
        })
        .catch(err => {
            return alert(err);
        });

}

// Leave room
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