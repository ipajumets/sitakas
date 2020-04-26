import React from "react";
import "./four_players.css";
import { handleUser } from "../helpers";

export default ({ game, round, prevRound, hand, prevHand, players, connections }) => {

    let player_0_card = hand ? myCard(hand, players[0].uid) : null,
        player_1_card = hand ? myCard(hand, players[1].uid) : null,
        player_2_card = hand ? myCard(hand, players[2].uid) : null;

    let player_0_won_wins = round ? wonAndWins(round, players[0].uid) : null,
        player_1_won_wins = round ? wonAndWins(round, players[1].uid) : null,
        player_2_won_wins = round ? wonAndWins(round, players[2].uid) : null;

    let player_0_prev_round = prevRound ? handlePrevRound(prevRound, players[0].uid) : null,
        player_1_prev_round = prevRound ? handlePrevRound(prevRound, players[1].uid) : null,
        player_2_prev_round = prevRound ? handlePrevRound(prevRound, players[2].uid) : null;

    return(
        <div className="four-players-table-container">
            <div className="four-players-table-side-container">
            </div>
            <div className="four-players-table-side-container" style={{justifyContent: "space-between", alignItems: "flex-start"}}>
                <div className="four-players-table-seat-container">
                    <div className="four-players-table-seat-profile-container">
                        <div className="four-players-table-seat-profile-image-container">
                            {
                                player_1_won_wins ?
                                    <div className="four-players-table-seat-profile-wins-container">
                                        <span className="seat-profile-wins">{player_1_won_wins.wins}</span>
                                    </div>
                                :
                                    <div></div>
                            }
                            {
                                player_1_won_wins ?
                                    <div className="four-players-table-seat-profile-won-container">
                                        <span className="seat-profile-won">{player_1_won_wins.won}</span>
                                    </div>
                                :
                                    <div></div>
                            }
                            <img className="four-players-table-seat-profile-image" style={{borderColor: handleUser(players[1].uid, connections)}} src={players[1].image} alt="" />
                            <div className="four-players-table-seat-profile-points-container">
                                <div style={{position: "relative"}}>
                                    <span className="seat-profile-points">{players[1].points}</span>
                                    {
                                        player_1_prev_round ?
                                            <div className="prev-round-container">
                                                {handlePrevRoundText(player_1_prev_round.won, player_1_prev_round.wins)}
                                            </div>
                                        :
                                            <div></div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="four-players-table-seat-name-container">
                        <span className="four-players-table-seat-name" style={{fontSize: handleFontSize(players[1].name)}}>{players[1].name}</span>
                    </div>
                    <div className="four-players-left-player-card-container">
                        {
                            player_1_card ?
                                <img className="player-card" src={require(`../../media/deck/${player_1_card.value}_${player_1_card.suit}.svg`)} alt="" />
                            :
                                <div></div>
                        }
                    </div>
                </div>
                <div className="four-players-table-seat-container">
                    <div className="four-players-table-seat-profile-container">
                        <div className="four-players-table-seat-profile-image-container">
                            {
                                player_2_won_wins ?
                                    <div className="four-players-table-seat-profile-wins-container">
                                        <span className="seat-profile-wins">{player_2_won_wins.wins}</span>
                                    </div>
                                :
                                    <div></div>
                            }
                            {
                                player_2_won_wins ?
                                    <div className="four-players-table-seat-profile-won-container">
                                        <span className="seat-profile-won">{player_2_won_wins.won}</span>
                                    </div>
                                :
                                    <div></div>
                            }
                            <img className="four-players-table-seat-profile-image" style={{borderColor: handleUser(players[2].uid, connections)}} src={players[2].image} alt="" />
                            <div className="four-players-table-seat-profile-points-container">
                                <div style={{position: "relative"}}>
                                    <span className="seat-profile-points">{players[2].points}</span>
                                    {
                                        player_2_prev_round ?
                                            <div className="prev-round-container">
                                                {handlePrevRoundText(player_2_prev_round.won, player_2_prev_round.wins)}
                                            </div>
                                        :
                                            <div></div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="four-players-table-seat-name-container">
                        <span className="four-players-table-seat-name" style={{fontSize: handleFontSize(players[2].name)}}>{players[2].name}</span>
                    </div>
                    <div className="four-players-right-player-card-container">
                        {
                            player_2_card ?
                                <img className="player-card" src={require(`../../media/deck/${player_2_card.value}_${player_2_card.suit}.svg`)} alt="" />
                            :
                                <div></div>
                        }
                    </div>
                </div>
            </div>
            <div className="four-players-table-side-container" style={{justifyContent: "center", alignItems: "flex-end"}}>
                <div className="four-players-table-seat-container">
                    <div className="four-players-table-seat-profile-container">
                        <div className="four-players-table-seat-profile-image-container">
                            {
                                player_0_won_wins ?
                                    <div className="four-players-table-seat-profile-wins-container">
                                        <span className="seat-profile-wins">{player_0_won_wins.wins}</span>
                                    </div>
                                :
                                    <div></div>
                            }
                            {
                                player_0_won_wins ?
                                    <div className="four-players-table-seat-profile-won-container">
                                        <span className="seat-profile-won">{player_0_won_wins.won}</span>
                                    </div>
                                :
                                    <div></div>
                            }                            
                            <img className="four-players-table-seat-profile-image" style={{borderColor: handleUser(players[0].uid, connections)}} src={players[0].image} alt="" />
                            <div className="four-players-table-seat-profile-points-container">
                                <div style={{position: "relative"}}>
                                    <span className="seat-profile-points">{players[0].points}</span>
                                    {
                                        player_0_prev_round ?
                                            <div className="prev-round-container">
                                                {handlePrevRoundText(player_0_prev_round.won, player_0_prev_round.wins)}
                                            </div>
                                        :
                                            <div></div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="four-players-table-seat-name-container">
                        <span className="four-players-table-seat-name" style={{fontSize: handleFontSize(players[0].name)}}>{players[0].name}</span>
                    </div>
                    <div className="four-players-bottom-player-card-container">
                        {
                            player_0_card ?
                                <img className="player-card" src={require(`../../media/deck/${player_0_card.value}_${player_0_card.suit}.svg`)} alt="" />
                            :
                                <div></div>
                        }
                    </div>
                </div>
            </div>
            <div className="trump-container">
                <span className="trump-title">TRUMP</span>
                <img className="trump-card" src={require(`../../media/deck/${round.trump.value}_${round.trump.suit}.svg`)} alt="" />
            </div>
            {
                hand ?
                    hand.base ?
                        <div className="base-container">
                            <span className="base-title">PÕHI</span>
                            <img className="trump-card" src={require(`../../media/deck/${hand.base.value}_${hand.base.suit}.svg`)} alt="" />
                        </div>
                    :
                        <div></div>
                :
                    <div></div>
            }
            <div className="stats-container">
                <span className="stats-text">Kaarte käes: <span className="bolded-text">{howManyCardsInHand(game.round)}</span></span>
                <span className="stats-text">Tahetakse: <span className="bolded-text">{howMuchWanted(round.results)}</span></span>
                <div style={{height: 2, backgroundColor: "tomato", width: 128, marginTop: 5, marginBottom: 5}}></div>
                <span className="stats-text"><span className="bolded-text">{whosTurn(round, players)}</span> {handleAction(round.action)}</span>
            </div>
            {
                prevHand ?
                    prevHand.cards ?
                        <div className="previous-hand-container">
                            <div className="prev-hand-title-container">
                                <span>Eelmine käsi</span>
                            </div>
                            <div className="prev-hand-cards-container">
                                {renderPrevCards(prevHand)}
                            </div>
                            <div className="prev-hand-bottom-container">
                                <span><span className="bolded-text">{whoTook(prevHand.winner, players)}</span> võttis</span>
                            </div>
                        </div>
                    :
                        <div></div>
                :
                    <div></div>
            }
        </div>
    );

}

let handleFontSize = (name) => {

    if (name.length < 10) {
        return 14;
    } else if (name.length < 16) {
        return 12;
    } else if (name.length < 20) {
        return 10;
    } else if (name.length < 24) {
        return 8;
    } else {
        return  6;
    }

}

let handlePrevRoundText = (won, wins) => {

    if (won === wins) {
        return <span className="prev-round-text" style={{marginRight: (won+5) > 9 ? -5 : 0, color: "#3AB795"}}>+{won+5}</span>;
    }

    if (won !== wins) {
        return <span className="prev-round-text" style={{marginRight: won > 9 ? -5 : 0, color: "#E05263"}}>+{won}</span>;
    }

}

let handlePrevRound = (prevRound, uid) => {

    return prevRound.results.filter(result => {
        return result.uid === uid;
    })[0];

}

let renderPrevCards = (prev) => {

    return prev.cards.map((card, index) => {
        return <img key={index} className="prev-card" style={{marginBottom: card.uid === prev.winner.uid ? 10 : 0, marginLeft: index !== 0 ? -20 : 0, zIndex: index+1, }} src={require(`../../media/deck/${card.value}_${card.suit}.svg`)} alt="" />;
    });

}

// Kui palju tahetakse
let howMuchWanted = (results) => {

    if (results.length < 1) {
        return 0;
    } else {
        return results.reduce((a, b) => +a + +b.wins, 0);
    }

}

// Kas mängija on kaardi käinud?
let myCard = (hand, uid) => {

    let find = hand.cards.filter(card => {
        return card.uid === uid;
    });

    if (find.length < 1) {
        return null;
    } else {
        return find[0];
    }   

}

// Mis on mängija bet ja võidetud kaardid?
let wonAndWins = (round, uid) => {

    let find = round.results.filter(player => {
        return player.uid === uid;
    });

    if (find.length < 1) {
        return null;
    } else {
        return find[0];
    }   

}

let whoTook = (winner, players) => {

    return players.filter(player => player.uid === winner.uid)[0].name;

}

let whosTurn = (round, players) => {

    return players.filter(player => player.uid === round.turn)[0].name;

}

let handleAction = (action) => {

    switch (action) {

        case "guess":
            return "pakub";
        case "call":
            return "käib";
        case "called":
            return "käis";
        default:
            return "";

    }

}

let howManyCardsInHand = (round) => {

    return rounds.filter(r => r.round === round)[0].amount;

}

// Rounds
let rounds = [
    {
        round: 1,
        amount: 1,
    },
    {
        round: 2,
        amount: 1,
    },
    {
        round: 3,
        amount: 1,
    },
    {
        round: 4,
        amount: 2,
    },
    {
        round: 5,
        amount: 3,
    },
    {
        round: 6,
        amount: 4,
    },
    {
        round: 7,
        amount: 5,
    },
    {
        round: 8,
        amount: 6,
    },
    {
        round: 9,
        amount: 7,
    },
    {
        round: 10,
        amount: 8,
    },
    {
        round: 11,
        amount: 9,
    },
    {
        round: 12,
        amount: 10,
    },
    {
        round: 13,
        amount: 11,
    },
    {
        round: 14,
        amount: 12,
    },
    {
        round: 15,
        amount: 12,
    },
    {
        round: 16,
        amount: 12,
    },
    {
        round: 17,
        amount: 11,
    },
    {
        round: 18,
        amount: 10,
    },
    {
        round: 19,
        amount: 9,
    },
    {
        round: 20,
        amount: 8,
    },
    {
        round: 21,
        amount: 7,
    },
    {
        round: 22,
        amount: 6,
    },
    {
        round: 23,
        amount: 5,
    },
    {
        round: 24,
        amount: 4,
    },
    {
        round: 25,
        amount: 3,
    },
    {
        round: 26,
        amount: 2,
    },
    {
        round: 27,
        amount: 1,
    },
    {
        round: 28,
        amount: 1,
    },
    {
        round: 29,
        amount: 1,
    },
];