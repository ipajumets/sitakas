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

    return fetch("/api/rounds/get-round", request)
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

    return fetch("/api/hands/get-hand", request)
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

    return fetch("/api/cards/get-my-cards", request)
        .then(res => res.json())
        .then(json => {
            return json;
        })
        .catch(err => {
            return alert(err);
        });

}

export let add_bet = (code, round, uid, wins, next_uid, next_action, last) => {

    let body = {
        code: code,
        round: round,
        uid: uid,
        wins: wins,
        next_uid: next_uid,
        next_action: next_action,
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

    return fetch("/api/rounds/add-bet", request)
        .then(res => res.json())
        .then(json => {
            return json;
        })
        .catch(err => {
            return alert(err);
        });

}

export let add_last_card = (code, round, hand, uid, value, suit, winner, next_uid, next_action, results, players, next_dealer) => {

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
        players: players,
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

    return(fetch("/api/hands/add-last-card", request))
        .then(res => res.json())
        .then(json => {
            return json;
        })
        .catch(err => {
            return alert(err);
        });

}

// v2

// Get data about game
export let getGameData = (code, browser_id) => {

    return fetch("/api/games/get-game-data/"+code+"/"+browser_id)
        .then(res => res.json())
        .then(json => {
            return json;
        })
        .catch(err => console.log(err));

}

// Add bet
export let addBet = (game_id, user_id, wins) => {

    let body = {
        uid: user_id,
        wins: wins,
    };

    let request = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };

    return fetch("/api/rounds/add-bet/"+game_id, request)
        .then(res => res.json())
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
            return;
        });

}

// Upload card
export let uploadCard = (game, card) => {

    let body = {
        card: card,
    };

    let request = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };

    return fetch("/api/hands/add-card/"+game.room_code, request)
        .then(res => res.json())
        .then(json => {
            return json;
        })
        .catch(err => {
            return alert(err);
        });

}

// Get jokers count
export let getJokersCount = (code) => {

    return fetch("/api/cards/jokers-count/"+code)
        .then(res => res.json())
        .then(json => {
            return json;
        })
        .catch(err => console.log(err));

}