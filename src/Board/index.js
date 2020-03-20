import React, { Component } from "react";
import "./index.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isMobile, withOrientationChange } from "react-device-detect";
import Fingerprint2 from "fingerprintjs2";
import socketIo from "socket.io-client";

// modules
import { setUserBrowserID, resetUser }  from "../modules/user";
import { setGame, resetGame, setNextTurn }  from "../modules/game";
import { setRound, addMyBet, addWon, resetRound }  from "../modules/round";
import { setHand, addCard, addHandWinner, resetHands }  from "../modules/hands";
import { setCards, removeCard, resetCards }  from "../modules/cards";
import { resetRoom }  from "../modules/room";

// api-requests
import { find_room, am_i_in, get_game, get_my_cards, get_round, get_hand, add_bet, add_card, add_last_card } from "./api-requests";

// Layouts
import ThreePlayersTable from "./layouts/three_players";
import FourPlayersTable from "./layouts/four_players";
import FivePlayersTable from "./layouts/five_players";
import SixPlayersTable from "./layouts/six_players";
import { rearrange, determineWinner, getSitaratas } from "./helpers";

// constants
let options = {};

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

        this.setState({ inner_width: window.innerWidth }, () => {
            window.addEventListener("resize", (ev) => {
                this.setState({ inner_width: ev.target.innerWidth });
            });
        });

        let that = this,
            socket = socketIo("https://www.sitaratas.eu:5000"),
            room_code = that.props.match.params.code;

        this.handleActions(socket, room_code);

        return Fingerprint2.getV18(options, (result) => {
            return that.props.setUserBrowserID(result)
                .then(_ => {
                    return result;
                })
                .then(browser_id => {
                    return find_room(room_code)
                        .then(room => {
                            if (room.data) {
                                if (room.data.state === "game_on") {
                                    return am_i_in(browser_id, room_code)
                                        .then(result => {
                                            if (result.success) {
                                                return get_game(room_code)
                                                    .then(game => {
                                                        return this.props.setGame(game)
                                                            .then(_ => {
                                                                return get_round(room_code, this.props.game.data.round)
                                                                    .then(round => {
                                                                        return this.props.setRound(round)
                                                                            .then(_ => {
                                                                                return get_hand(room_code, this.props.game.data.round, game.hand)
                                                                                    .then(hand => {
                                                                                        return this.props.setHand(hand)
                                                                                            .then(_ => {
                                                                                                return get_my_cards(room_code, this.props.game.data.round, browser_id)
                                                                                                    .then(cards => {
                                                                                                        if (cards) {
                                                                                                            return this.props.setCards(cards.active)
                                                                                                                .then(_ => {
                                                                                                                    return this.setState({ loading: false });
                                                                                                                });
                                                                                                        }  else {
                                                                                                            return this.setState({ loading: false });
                                                                                                        }
                                                                                                    });
                                                                                            });
                                                                                    });
                                                                            });
                                                                    });
                                                            });
                                                    });
                                            } else {
                                                return this.props.history.push("/");
                                            }
                                        });
                                } else {
                                    return this.props.history.push(`/setup/${room_code}`);
                                }
                            } else {
                                return this.props.history.push("/");
                            }
                        });
                });
        });

    }

    handleActions = (socket, code) => {

        socket.on(`${code}_bet_added`, result => {
            return this.props.setNextTurn(result.uid, result.action)
                .then(_ => {
                    if (result.bet.uid !== this.props.user.browser_id) {
                        return this.props.addMyBet(result.bet);
                    } else {
                        return;
                    }
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

        socket.on(`${code}_hand_winner`, result => {
            return this.setState({ selected_card: {} }, () => {
                return this.props.addCard(result.card)
                    .then(_ => {
                        if (result.card.uid !== this.props.user.browser_id) {
                            return this.props.addWon(result.winner.uid)
                                .then(_ => {
                                    return this.props.addHandWinner(result.winner);
                                });
                        } else {
                            return;
                        }
                    });
            });
        });

        socket.on(`${code}_new_round`, result => {
            return this.setState({ selected_card: {} }, () => {
                return get_game(result.code)
                    .then(game => {
                        return this.props.setGame(game)
                            .then(_ => {
                                return get_round(result.code, this.props.game.data.round)
                                    .then(round => {
                                        return this.props.setRound(round)
                                            .then(_ => {
                                                return get_hand(result.code, this.props.game.data.round, game.hand)
                                                    .then(hand => {
                                                        return this.props.setHand(hand)
                                                            .then(_ => {
                                                                return get_my_cards(result.code, this.props.game.data.round, this.props.user.browser_id)
                                                                    .then(cards => {
                                                                        return this.props.setCards(cards.active);
                                                                    });
                                                            });
                                                    });
                                            });
                                    });
                            });
                    });
            });
        });

        socket.on(`${code}_next_hand`, result => {
            return this.setState({ selected_card: {} }, () => {
                return get_game(result.code)
                    .then(game => {
                        return this.props.setGame(game)
                            .then(_ => {
                                return get_round(result.code, this.props.game.data.round)
                                    .then(round => {
                                        return this.props.setRound(round)
                                            .then(_ => {
                                                return get_hand(result.code, this.props.game.data.round, game.hand)
                                                    .then(hand => {
                                                        return this.props.setHand(hand);
                                                    });
                                            });
                                    });
                            });
                    });
            });
        });

    }

    handleTable = (game, round, hand, uid) => {

        let sorted = rearrange(game.players, uid);

        switch (game.players.length) {

            case 3:
                return <ThreePlayersTable />;
            case 4:
                return <FourPlayersTable game={game} round={round} hand={hand} players={sorted} />;
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

        return cards.map((card, index) => {
            if (this.state.selected_card.suit === card.suit && this.state.selected_card.value === card.value) {
                return(
                    <div style={canFit ? {zIndex: index+1} : {zIndex: index+1, marginLeft: index !== 0 ? -marginLeft : 0}} className="board-hand-selected-card-container" key={index} onClick={() => this.handle_card_send(card, game, uid, hand, index)}>
                        <div className="board-hand-card-value-container">
                            <div className="board-hand-card-value-and-suit-container">
                                <span className="board-hand-card-value" style={card.suit === "diamonds" || card.suit === "hearts" ? {color: "red"} : {color: "black"}}>{this.handleCardValue(card.value)}</span>
                                <span className="board-hand-card-value-suit" style={{marginTop: 5}}>{this.handleCardType(card.suit)}</span>
                            </div>
                        </div>
                        <div className="board-hand-card-type-container">
                            {this.handleCardType(card.suit)}
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
                                <span className="board-hand-card-value" style={card.suit === "diamonds" || card.suit === "hearts" ? {color: "red"} : {color: "black"}}>{this.handleCardValue(card.value)}</span>
                                <span className="board-hand-card-value-suit" style={{marginTop: 5}}>{this.handleCardType(card.suit)}</span>
                            </div>
                        </div>
                        <div className="board-hand-card-type-container">
                            {this.handleCardType(card.suit)}
                        </div>
                    </div>
                );
            }
        });

    }

    handle_card_send = (card, game, uid, hand, card_index) => {

        let sorted = rearrange(game.players, uid);

        if (hand.cards.length < 1) {
            return this.props.removeCard(card_index)
                .then(_ => {
                    return this.props.addCard({ uid: uid, value: card.value, suit: card.suit })
                        .then(_ => {
                            return this.props.setNextTurn(sorted[1].uid, "call")
                                .then(_ => {
                                    return add_card(game.room_code, game.round, game.hand, uid, card.value, card.suit, sorted[1].uid, true, false);
                                });
                        });
                });
        } else if (hand.cards.length+1 !== game.players.length) {
            return this.props.removeCard(card_index)
                .then(_ => {
                    return this.props.addCard({ uid: uid, value: card.value, suit: card.suit })
                        .then(_ => {
                            return this.props.setNextTurn(sorted[1].uid, "call")
                                .then(_ => {
                                    return add_card(game.room_code, game.round, game.hand, uid, card.value, card.suit, sorted[1].uid, false, false);
                                });
                        });
                });
        } else {
            return this.props.removeCard(card_index)
                .then(_ => {
                    return this.props.addCard({ uid: uid, value: card.value, suit: card.suit })
                        .then(_ => {

                            let winner = determineWinner(this.props.hands.data, game);

                            return this.props.addWon(winner.uid)
                                .then(_ => {
                                    return this.props.addHandWinner({ uid: winner.uid, value: winner.value, suit: winner.suit })
                                        .then(_ => {
                                            
                                            if (this.props.cards.data.length < 1) {

                                                let line = rearrange(game.players, game.dealer);

                                                return add_last_card(game.room_code, game.round, game.hand, uid, card.value, card.suit, winner, line[2].uid, "guess", this.props.round.data.results, line[1].uid);

                                            } else {

                                                return add_last_card(game.room_code, game.round, game.hand, uid, card.value, card.suit, winner, winner.uid, "call", this.props.round.data.results);
                                                
                                            }

                                        });
                                });
                            
                        });
                });
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
        }

    }

    handleCardValue = (value) => {

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

    handleCardType = (type) => {

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

    add_my_bet = (game, uid, wins, round, cards) => {

        let sorted = rearrange(game.players, uid);

        if (round.results.length+1 === game.players.length) {
            
            let sum = round.results.reduce((a, b) => +a + +b.wins, 0);

            if (sum+wins !== cards.length) {
                return this.props.setNextTurn(sorted[1].uid, "call")
                    .then(_ => {
                        return this.props.addMyBet({ uid: uid, wins: wins, won: 0 })
                            .then(_ => {
                                return this.setState({ wins: 0 }, () => {
                                    return add_bet(game.room_code, game.round, uid, wins, sorted[1].uid, true);
                                });
                            });
                    });
            } else {
                return alert("Kuule, kuule!");
            }

        } else {
            return this.props.setNextTurn(sorted[1].uid, "guess")
                .then(_ => {
                    return this.props.addMyBet({ uid: uid, wins: wins, won: 0 })
                        .then(_ => {
                            return this.setState({ wins: 0 }, () => {
                                return add_bet(game.room_code, game.round, uid, wins, sorted[1].uid, false);
                            });
                        });
                });
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
                <div className="board-action-container">
                    <div className="board-action-navigation-container">
                        <span className="board-action-navigation-title">MÄNG {this.props.game.data.room_code}</span>
                        <span className="board-action-navigation-subtitle">ROUND {this.props.game.data.round}/26</span>
                    </div>
                    <div className="board-action-wrapper">
                        <div className="board-table-container">
                            {this.handleTable(this.props.game.data, this.props.round.data, this.props.hands.data, this.props.user.browser_id)}
                            {
                                !this.props.game.data.over && this.props.game.data.turn === this.props.user.browser_id && this.props.game.data.action === "guess" ?
                                    <div className="guess-wins-container">
                                        <div className="guess-wins-wrapper">
                                            <div className="guess-wins-header-container">
                                                <span>Mitu tihi?</span>
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
                                                <span onClick={() => this.add_my_bet(this.props.game.data, this.props.user.browser_id, this.state.wins, this.props.round.data, this.props.cards.data)}>Kinnita</span>
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
                                                <img src={"https://www.basket.ee/cache/basket/public/remote/http_is-basket-ee/_2000x2000x0/bw-client-filesXbasketisXpublicXplayer-pictureX397-56.jpg"} className="game-over-alert-image" />
                                                <div className="game-over-alert-text-container">
                                                    <h3>💩 {getSitaratas(this.props.game.data.players).name}</h3>
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
            );
        } else {
            return(
                <div className="board-loading-container">
                    <div className="board-action-navigation-container">
                        
                    </div>
                    <div className="board-loading-wrapper">
                        <img className="board-loading-svg" src={require("../media/svgs/loading.svg")} alt="" />
                    </div>
                    
                </div>
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
        ...bindActionCreators({ resetRoom, setUserBrowserID, setGame, resetGame, setNextTurn, setRound, addMyBet, addWon, setHand, addCard, addHandWinner, setCards, removeCard, resetCards, resetHands, resetRound, resetUser }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withOrientationChange(Board));