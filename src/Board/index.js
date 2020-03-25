import React, { Component } from "react";
import "./index.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import socketIo from "socket.io-client";
import Page from "../Page";

// modules
import { resetUser }  from "../modules/user";
import { setGame, resetGame, setNextTurn }  from "../modules/game";
import { setRound, addMyBet, resetRound, updateResults, addWon }  from "../modules/round";
import { setHand, setPreviousHand, addCard, addHandWinner, resetHands }  from "../modules/hands";
import { setCards, removeCard, resetCards }  from "../modules/cards";
import { resetRoom }  from "../modules/room";

// api-requests
import { add_bet, add_card, add_last_card, getGameData } from "./api-requests";

// Layouts
import ThreePlayersTable from "./layouts/three_players";
import FourPlayersTable from "./layouts/four_players";
import FivePlayersTable from "./layouts/five_players";
import SixPlayersTable from "./layouts/six_players";

// helpers
import { rearrangePlayersOrder, determineWinner, getSitaratas, checkErrors, checkBets, handleCardValue, handleCardType, sortCards, totalRounds } from "./helpers";

class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            wins: 0,
            selected_card: {},
            inner_width: 0,
        };

    }

    componentDidMount = () => {

        let that = this,
            room_code = that.props.match.params.code;

        that.setState({ inner_width: window.innerWidth }, () => {
            window.addEventListener("resize", (ev) => {
                that.setState({ inner_width: ev.target.innerWidth });
            });
        });

        that.receiveSockets(room_code, that.props.user.browser_id);
        that.handleGame(room_code, that.props.user.browser_id);

    }

    handleGame = (code, id) => {

        return getGameData(code, id)
            .then(result => {
                if (checkErrors(result)) {
                    if (result.room.state === "game_on") {
                        return this.props.setGame(result.game)
                            .then(_ => {
                                return this.props.setRound(result.round);
                            })
                            .then(_ => {
                                return this.props.setPreviousHand(result.previousHand)
                                    .then(_ => {
                                        return this.props.setHand(result.hand);
                                    })
                                    .then(_ => {
                                        return this.props.setCards(result.myCards.active)
                                            .then(_ => {
                                                return this.setState({ loading: false });
                                            });
                                    });
                            });
                    } else {
                        return this.props.history.push(`/setup/${result.room.code}`);
                    }
                } else {
                    return this.props.history.push("/");
                }
            });

    }

    receiveSockets = (code, id) => {

        let socket = socketIo("https://www.sitaratas.eu:5000");

        socket.on(`${code}_bet_added`, result => {
            return this.props.setNextTurn(result.uid, result.action)
                .then(_ => {
                    if (result.bet.uid !== this.props.user.browser_id) {
                        return this.props.addMyBet(result.bet);
                    }
                    return;
                });
        });

        socket.on(`${code}_card_added`, result => {
            return this.setState({ selected_card: {} }, () => {
                return this.props.addCard(result.card)
                    .then(_ => {
                        return this.props.setNextTurn(result.uid, result.action);
                    });
            });
        });

        socket.on(`${code}_last_card_added`, result => {
            return this.setState({ selected_card: {} }, () => {
                return this.props.addCard(result.card)
                    .then(_ => {
                        return this.props.addWon(result.winner.uid)
                    })
                    .then(_ => {
                        return this.props.addHandWinner({ uid: result.winner.uid, value: result.winner.value, suit: result.winner.suit });
                    });
            });
        });

        socket.on(`${code}_update_results`, result => {
            return this.props.updateResults(result.data);
        });

        socket.on(`${code}_new_round`, _ => {
            return this.setState({ selected_card: {} }, () => {
                return this.handleGame(code, id);
            });
        });

        socket.on(`${code}_next_hand`, _ => {
            return this.setState({ selected_card: {} }, () => {
                return this.handleGame(code, id);
            });
        });

    }

    handleTable = (game, round, hand, prevHand, uid) => {

        let sorted = rearrangePlayersOrder(game.players, uid);

        switch (game.players.length) {

            case 3:
                return <ThreePlayersTable game={game} round={round} hand={hand} prevHand={prevHand} players={sorted} />;
            case 4:
                return <FourPlayersTable game={game} round={round} hand={hand} prevHand={prevHand} players={sorted} />;
            case 5:
                return <FivePlayersTable />;
            case 6:
                return <SixPlayersTable />;
            default:
                return <ThreePlayersTable />;

        }

    }

    renderCards = (cards, game, uid, hand) => {

        let marginLeft = (((cards.length * 128) - this.state.inner_width) / cards.length) + cards.length;
        let canFit = cards.length * 128 < this.state.inner_width ? true : false;

        let sortedCards = sortCards(cards, game.trump);

        return sortedCards.map((card, index) => {
            if (this.state.selected_card.suit === card.suit && this.state.selected_card.value === card.value) {
                return(
                    <div style={canFit ? {zIndex: index+1} : {zIndex: index+1, marginLeft: index !== 0 ? -marginLeft : 0}} className="board-hand-selected-card-container" key={index} onClick={() => this.handle_card_send(card, game, uid, hand, index)}>
                        <div className="board-hand-card-value-container">
                            <div className="board-hand-card-value-and-suit-container">
                                <span className="board-hand-card-value" style={card.suit === "diamonds" || card.suit === "hearts" ? {color: "red"} : {color: "black"}}>{handleCardValue(card.value)}</span>
                                <span className="board-hand-card-value-suit" style={{marginTop: 5}}>{handleCardType(card.suit)}</span>
                            </div>
                        </div>
                        <div className="board-hand-card-type-container">
                            {handleCardType(card.suit)}
                        </div>
                        <div className="selected-card-overlay">
                            <img src={require("../media/svgs/up-arrow.svg")} style={{width: 24, height: 24}} alt=""/>
                            <span>SAADA</span>
                        </div>
                    </div>
                );
            } else {
                return(
                    <div style={canFit ? {zIndex: index+1} : {zIndex: index+1, marginLeft: index !== 0 ? -marginLeft : 0}} className="board-hand-card-container" key={index} onClick={() => this.handle_card_select(card, game, uid, hand, cards)}>
                        <div className="board-hand-card-value-container">
                            <div className="board-hand-card-value-and-suit-container">
                                <span className="board-hand-card-value" style={card.suit === "diamonds" || card.suit === "hearts" ? {color: "red"} : {color: "black"}}>{handleCardValue(card.value)}</span>
                                <span className="board-hand-card-value-suit" style={{marginTop: 5}}>{handleCardType(card.suit)}</span>
                            </div>
                        </div>
                        <div className="board-hand-card-type-container">
                            {handleCardType(card.suit)}
                        </div>
                    </div>
                );
            }
        });

    }

    add_my_bet = (game, uid, wins, round, cards) => {

        let sorted = rearrangePlayersOrder(game.players, uid),
            isLast = round.results.length+1 === game.players.length,
            nextAction = isLast ? "call" : "guess",
            sum = round.results.reduce((a, b) => +a + +b.wins, 0),
            winsGood = sum+wins !== cards.length,
            allGood = checkBets(isLast, winsGood);

        if (allGood) {
            return this.props.setNextTurn(sorted[1].uid, nextAction)
                .then(_ => {
                    return this.props.addMyBet({ uid: uid, wins: wins, won: 0 })
                        .then(_ => {
                            return this.setState({ wins: 0 }, () => {
                                return add_bet(game.room_code, game.round, uid, wins, sorted[1].uid, nextAction, isLast);
                            });
                        });
                });
        } else {
            return alert(wins+" ei saa pakkuda");
        }

    }

    handle_card_select = (card, game, uid, hand, cards) => {

        if (game.turn === uid && game.action === "call") {
            if (hand.cards.length < 1) {
                return this.setState({ selected_card: card });
            } else {

                let myBaseCards = cards.filter(c => c.suit === hand.base.suit);
                let myTrumpCards = cards.filter(c => c.suit === game.trump.suit);
                
                if (myBaseCards.length > 0) {
                    if (card.suit === hand.base.suit) {
                        return this.setState({ selected_card: card });
                    } else {
                        return alert("Palun käi masti");
                    }
                } else if (myTrumpCards.length > 0) {
                    if (card.suit === game.trump.suit) {
                        return this.setState({ selected_card: card });
                    } else {
                        return alert("Palun käi trumpi");
                    }
                } else {
                    return this.setState({ selected_card: card });
                }

            }
        } else {
            console.log(card);
            console.log(game);
            console.log(uid);
            console.log(hand);
            console.log(cards);
            return alert("Veel ei ole sinu kord");
        }

    }

    handle_card_send = (card, game, uid, hand, card_index) => {

        let sorted = rearrangePlayersOrder(game.players, uid),
            isFirst = hand.cards.length < 1,
            isLast = hand.cards.length+1 === game.players.length,
            dealerOrder = rearrangePlayersOrder(game.players, game.dealer);
            
        return this.props.removeCard(card_index)
            .then(_ => {
                return this.props.addCard({ uid: uid, value: card.value, suit: card.suit })
                    .then(_ => {

                        let lastCard = this.props.cards.data.length < 1,
                            winner = determineWinner(this.props.hands.data, game),
                            nextUid = lastCard ? dealerOrder[2].uid : winner.uid,
                            nextAction = lastCard ? "guess" : "call",
                            nextDealer = lastCard ? dealerOrder[1].uid : dealerOrder[0].uid;

                        return this.props.setNextTurn(sorted[1].uid, "call")
                            .then(_ => {
                                if (!isLast) {
                                    return add_card(game.room_code, game.round, game.hand, uid, card.value, card.suit, sorted[1].uid, "call", isFirst, isLast);
                                } else {
                                    return this.props.addWon(winner.uid)
                                        .then(_ => {
                                            return this.props.addHandWinner({ uid: winner.uid, value: winner.value, suit: winner.suit });
                                        })
                                        .then(_ => {
                                            return add_last_card(game.room_code, game.round, game.hand, uid, card.value, card.suit, winner, nextUid, nextAction, this.props.round.data.results, game.players, nextDealer);
                                        });
                                }
                            });
                    });
            });

    }

    handle_wins_bet_add = (wins, cards) => {

        let new_value = wins+1;

        if (new_value > cards.length) {
            return this.setState({ wins: wins});
        } else {
            return this.setState({ wins: new_value});
        }

    }

    handle_wins_bet_substract = (wins) => {

        let new_value = wins-1;

        if (new_value >= 0) {
            return this.setState({ wins: new_value});
        } else {
            return this.setState({ wins: 0});
        }

    } 

    exitGame = () => {

        return this.setState({ loading: true }, () => {
            return this.props.resetGame()
                .then(_ => {
                    this.props.resetRound()
                        .then(_ => {
                            return this.props.resetHands()
                                .then(_ => {
                                    return this.props.resetCards()
                                        .then(_ => {
                                            return this.props.resetRoom()
                                                .then(_ => {
                                                    return this.props.resetUser()
                                                        .then(_ => {
                                                            return this.props.history.push("/");
                                                        });
                                                });
                                        });
                                });
                        });
                });
        });

    }

    render = () => {

        if (!this.state.loading) {
            return(
                <Page>
                    <div className="board-action-container">
                        <div className="board-action-navigation-container">
                            <span className="board-action-navigation-title">MÄNG {this.props.game.data.room_code}</span>
                            <span className="board-action-navigation-subtitle">ROUND {this.props.game.data.round}/{totalRounds(this.props.game.data.players.length)}</span>
                        </div>
                        <div className="board-action-wrapper">
                            <div className="board-table-container">
                                {this.handleTable(this.props.game.data, this.props.round.data, this.props.hands.data, this.props.hands.prev, this.props.user.browser_id)}
                                {
                                    !this.props.game.data.over && this.props.game.data.turn === this.props.user.browser_id && this.props.game.data.action === "guess" ?
                                        <div className="guess-wins-container">
                                            <div className="guess-wins-wrapper">
                                                <div className="guess-wins-header-container">
                                                    <span>Sinu panus</span>
                                                </div>
                                                <div className="guess-wins-input-container">
                                                    <div className="guess-wins-input-button-container" onClick={() => this.handle_wins_bet_substract(this.state.wins)}>
                                                        <span>-</span>
                                                    </div>
                                                    <div className="guess-wins-input-value-container">
                                                        <span>{this.state.wins}</span>
                                                    </div>
                                                    <div className="guess-wins-input-button-container" onClick={() => this.handle_wins_bet_add(this.state.wins, this.props.cards.data)}>
                                                        <span>+</span>
                                                    </div>
                                                </div>
                                                <div className="guess-wins-footer-container">
                                                    <div className="guess-wins-footer-button-container" onClick={() => this.add_my_bet(this.props.game.data, this.props.user.browser_id, this.state.wins, this.props.round.data, this.props.cards.data)}>
                                                        <span>Kinnita</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    :
                                        <div></div>
                                }
                                {
                                    this.props.hands.data ?
                                        this.props.hands.data.winner ?
                                            <div className="hand-winner-overlay-container">
                                                <span><b>{this.props.game.data.players.filter(player => player.uid === this.props.hands.data.winner.uid)[0].name}</b> võtab</span>
                                            </div>
                                        :
                                            <div></div>
                                    :
                                        <div></div>
                                }
                                {
                                    this.props.game.data.turn === this.props.user.browser_id && this.props.game.data.action === "call" && !this.props.hands.data.winner ?
                                        <div className="hand-winner-overlay-container">
                                            <span><b>Sinu</b> kord</span>
                                        </div>
                                    :
                                        <div></div>
                                }
                            </div>
                            <div className="board-hand-container" style={{justifyContent: this.props.cards.data.length * 128 < this.state.inner_width ? "space-around" : "flex-start" }}>
                                {
                                    this.props.game.data ?
                                        !this.props.game.data.over ?
                                            this.renderCards(this.props.cards.data, this.props.game.data, this.props.user.browser_id, this.props.hands.data)
                                        :
                                            <div className="game-over-alert-container">
                                                <div className="game-over-alert-wrapper">
                                                    <img src={getSitaratas(this.props.game.data.players).image} className="game-over-alert-image" alt="" />
                                                    <div className="game-over-alert-text-container">
                                                        <h3><span role="img" aria-label="Poop">💩</span> {getSitaratas(this.props.game.data.players).name}</h3>
                                                        <span>Sitaratas</span>
                                                    </div>
                                                    <div className="game-over-leave-container">
                                                        <span onClick={() => this.exitGame()}>Välju</span>
                                                    </div>
                                                </div>
                                            </div>
                                    :
                                        <div></div>
                                } 
                            </div>
                        </div>
                        
                    </div>
                </Page>
            );
        } else {
            return(
                <Page>
                    <div className="board-loading-container">
                        <div className="board-action-navigation-container">
                            
                        </div>
                        <div className="board-loading-wrapper">
                            <img className="board-loading-svg" src={require("../media/svgs/loading.svg")} alt="" />
                        </div>
                        
                    </div>
                </Page>
            );
        }

    }

}

let mapStateToProps = (state) => {
    return {
        user: state.user,
        room: state.room,
        game: state.game,
        round: state.round,
        hands: state.hands,
        cards: state.cards,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({ resetRoom, setGame, resetGame, setNextTurn, setRound, addMyBet, setHand, setPreviousHand, addCard, updateResults, setCards, removeCard, resetCards, resetHands, resetRound, resetUser, addWon, addHandWinner }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);