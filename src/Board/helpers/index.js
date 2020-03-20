export function rearrange(players, uid) {

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

export function determineWinner(hand, game) {

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

export function getSitaratas(players) {

    let sorted = players.sort((a, b) => a.points - b.points);

    return sorted[0];
    
}