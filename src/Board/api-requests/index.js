export let find_room = (code) => {

    return fetch("https://www.sitaratas.eu/api/rooms/check/"+code)
        .then(res => res.json())
        .then(json => {
            return json;
        })
        .catch(err => {
            return alert(err);
        });

}

export let am_i_in = (id, code) => {

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

    return fetch("https://www.sitaratas.eu/api/users/am-i-in", request)
        .then(res => res.json())
        .then(json => {
            return json;
        })
        .catch(err => {
            return alert(err);
        });

}

export let get_game = (code) => {

    return fetch("https://www.sitaratas.eu/api/games/return/"+code)
        .then(res => res.json())
        .then(json => {
            return json;
        })
        .catch(err => {
            return alert(err);
        });
    
}

export let get_round = (code, round) => {

    let body = {
        code: code,
        round: round,
    };

    let request = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };

    return fetch("https://www.sitaratas.eu/api/rounds/get-round", request)
        .then(res => res.json())
        .then(json => {
            return json;
        })
        .catch(err => {
            return alert(err);
        });

}

export let get_hand = (code, round, hand) => {

    let body = {
        code: code,
        round: round,
        hand: hand,
    };

    let request = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };

    return fetch("https://www.sitaratas.eu/api/hands/get-hand", request)
        .then(res => res.json())
        .then(json => {
            return json;
        })
        .catch(err => {
            return alert(err);
        });

}

export let get_my_cards = (code, round, uid) => {

    let body = {
        code: code,
        round: round,
        uid: uid,
    };

    let request = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };

    return fetch("https://www.sitaratas.eu/api/cards/get-my-cards", request)
        .then(res => res.json())
        .then(json => {
            return json;
        })
        .catch(err => {
            return alert(err);
        });

}

export let add_bet = (code, round, uid, wins, next_uid, last) => {

    let body = {
        code: code,
        round: round,
        uid: uid,
        wins: wins,
        next_uid: next_uid,
        last: last,
    };

    let request = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };

    return fetch("https://www.sitaratas.eu/api/rounds/add-bet", request)
        .then(res => res.json())
        .then(json => {
            return json;
        })
        .catch(err => {
            return alert(err);
        });

}

export let add_card = (code, round, hand, uid, value, suit, next_uid, first, last) => {

    let body = {
        code: code,
        round: round,
        hand: hand,
        uid: uid,
        next_uid: next_uid,
        first: first,
        last: last,
        value: value,
        suit: suit,
    };

    let request = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };

    return fetch("https://www.sitaratas.eu/api/hands/add-card", request)
        .then(res => res.json())
        .then(json => {
            return json;
        })
        .catch(err => {
            return alert(err);
        });

}

export let add_last_card = (code, round, hand, uid, value, suit, winner, next_uid, next_action, results, next_dealer) => {

    let body = {
        code: code,
        round: round,
        hand: hand,
        uid: uid,
        value: value,
        suit: suit,
        winner: winner,
        next_uid: next_uid,
        next_action: next_action,
        results: results,
        next_dealer: next_dealer,
    };

    let request = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };

    return fetch("https://www.sitaratas.eu/api/hands/add-last-card", request)
        .then(res => res.json())
        .then(json => {
            return json;
        })
        .catch(err => {
            return alert(err);
        });

}