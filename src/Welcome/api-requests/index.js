export let create_new_room = (host_id) => {

    let body = {
        id: host_id,
    };

    let request = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    }

    return fetch("/api/rooms/create-new-room", request)
        .then(res => res.json())
        .then(json => {
            return json;
        })
        .catch(err => {
            return alert(err);
        });

}

export let get_public_games = () => {

    return fetch("/api/rooms/public")
        .then(res => res.json())
        .then(json => {
            return json.rooms;
        })
        .catch(err => {
            return alert(err);
        });

}