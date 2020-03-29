import React from "react";

// Rearrange players order
export let rearrangePlayersOrder = (players, uid) => {

    let sorted = players.map((player, index) => {
        return {
            ...player,
            index: index,
        };
    });

    let me = sorted.filter(player => player.uid === uid),
        first = me[0].index,
        first_half = sorted.splice(first),
        second_half = sorted.splice(0, first),
        full = [...first_half, ...second_half];

    return full;

}

// Determine points on round end

export let determineWinner = (hand, game) => {

    let cards = hand.cards,
        trump = game.trump,
        base = hand.base;

    let playersWithTrump = cards.filter(card => card.suit === trump.suit);

    if (playersWithTrump.length === 1) {
        return playersWithTrump[0];
    } else if (playersWithTrump.length > 1) {
        let sorted = playersWithTrump.sort((a, b) => b.value - a.value);
        return sorted[0];
    }

    let playersWithBase = cards.filter(card => card.suit === base.suit);

    if (playersWithBase.length === 1) {
        return playersWithBase[0];
    } else if (playersWithBase.length > 1) {
        let sorted = playersWithBase.sort((a, b) => b.value - a.value);
        return sorted[0];
    }

}

export let getSitaratas = (players) => {

    let to_be_sorted = players;

    let sorted = to_be_sorted.sort((a, b) => a.points - b.points);

    return sorted[0];
    
}

// Check for errors

export let checkErrors = (result) => {

    if (!result.room) {
        alert("Mängu ei leitud");
        return false;
    }

    if (!result.user) {
        alert("Mäng juba käib, oled hiljaks jäänud...");
        return false;
    }

    if (!result.game) {
        alert("Viga! Midagi läks untsu... Mängu ei leitud");
        return false;
    }

    if (!result.round) {
        alert("Viga! Midagi läks untsu... Roundi ei leitud");
        return false;
    }

    if (!result.hand) {
        alert("Viga! Midagi läks untsu... Kätt ei leitud");
        return false;
    }

    if (!result.myCards) {
        alert("Viga! Midagi läks untsu... Selle roundi kaarte ei leitud");
        return false;
    }

    return true;

}

// Check bets for errors
export let checkBets = (isLast, winsGood) => {

    if (!isLast) {
        return true;
    }

    if (isLast && winsGood) {
        return true;
    }

    return false;

}

// Replace card value
export let handleCardValue = (value) => {

    switch (value) {
        case 11:
            return "J";
        case 12:
            return "Q";
        case 13:
            return "K";
        case 14:
            return "A";
        default:
            return value;
    }

}

// Handle card type
export let handleCardType = (type) => {

    switch (type) {

        case "spades":
            return <span style={{color: "black"}}>♠</span>;
        case "diamonds":
            return <span style={{color: "red"}}>♦</span>;
        case "clubs":
            return <span style={{color: "black"}}>♣</span>;
        case "hearts":
            return <span style={{color: "red"}}>♥</span>;
        default:
            return <span></span>;

    }

}

// Sort cards by trump first
export let sortCards = (cards, trump) => {

    return cards.sort((a, b) => {

        let aSuit = handleSuitValue(trump, a),
            bSuit = handleSuitValue(trump, b);

        if (aSuit > bSuit) return -1;
        if (aSuit < bSuit) return 1;

        if (a.value > b.value) return -1;
        if (a.value < b.value) return 1;
        
        return 0;
    
    });

}

// Create value for suit
let handleSuitValue = (trump, card) => {

    switch (card.suit) {
        case "diamonds":
            return trump.suit !== card.suit ? 1 : 100;
        case "clubs":
            return trump.suit !== card.suit ? 2 : 100;
        case "hearts":
            return trump.suit !== card.suit ? 3 : 100;
        case "spades":
            return trump.suit !== card.suit ? 4 : 100;
        default:
            return 5;
    }

};

export let totalRounds = (players) => {

    switch (players) {
        case 3:
            return 29;
        case 4:
            return 26;
        case 5:
            return 25;
        case 6:
            return 26;
        default:
            return "";
    }

}   