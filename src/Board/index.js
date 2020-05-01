import React, { Component } from "react";
import "./index.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import io from "socket.io-client";
import Page from "../Page";
import { isMobileSafari, isChrome, isMobile, isIOS } from "react-device-detect";

// modules
import { resetUser }  from "../modules/user";
import { setGame, updateGameHand, resetGame }  from "../modules/game";
import { setRound, setPreviousRound, addMyBet, resetRound, updateResults, addWon, setNextTurn }  from "../modules/round";
import { setHand, setPreviousHand, addCard, addHandWinner, resetHands }  from "../modules/hands";
import { setCards, removeCard, resetCards }  from "../modules/cards";
import { resetRoom }  from "../modules/room";
import { setConnections }  from "../modules/socket";

// api-requests
import { getGameData, addBet, uploadCard } from "./api-requests";

// Layouts
import ThreePlayersTable from "./layouts/three_players";
import FourPlayersTable from "./layouts/four_players";
import FivePlayersTable from "./layouts/five_players";
import SixPlayersTable from "./layouts/six_players";

// helpers
import { rearrangePlayersOrder, getSitaratas, checkErrors, sortCards, totalRounds } from "./helpers";
import Chat from "../Chat";

class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            init: false,
            wins: 0,
            selected_card: {},
            inner_width: 0,
        };

    }

    componentDidMount = () => {

        this.socket = io("https://www.sitaratas.eu:5000/");
        this.socket.emit("set-active", { code: this.props.match.params.code, uid: this.props.user.browser_id });

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

    componentWillUnmount = () => {

        this.socket.close();

    }

    handleGame = (code, id) => {
        
        if (!this.state.init) {
            return this.setState({ init: true }, () => {
                return getGameData(code, id)
                    .then(result => {
                        if (checkErrors(result)) {
                            if (result.room.state === "game_on") {
                                return this.props.setGame(result.game)
                                    .then(_ => {
                                        return this.props.setPreviousRound(result.previousRound)
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
                                                                return this.props.setConnections(result.users)
                                                            })
                                                            .then(_ => {
                                                                return this.setState({ loading: false, init: false });
                                                            });
                                                    });
                                            });
                                    })
                            } else {
                                return this.props.history.push(`/setup/${result.room.code}`);
                            }
                        } else {
                            return this.props.history.push("/");
                        }
                    });
            });
        }

    }

    receiveSockets = (code, id) => {

        this.socket.on(`${code}_bet_done`, result => {
            return this.props.setRound(result);
        });

        this.socket.on(`${code}_update_hand`, result => {
            return this.props.setHand(result);
        });

        this.socket.on(`${code}_update_round`, result => {
            return this.props.setRound(result);
        });

        this.socket.on(`${code}_new_hand`, _ => {
            return this.setState({ selected_card: {} }, () => {
                return this.handleGame(code, id);
            });
        });

        this.socket.on(`${code}_new_round`, _ => {
            return this.setState({ selected_card: {} }, () => {
                return this.handleGame(code, id);
            });
        });

        this.socket.on(`${code}_update_connections`, result => {
            return this.props.setConnections(result);
        });

        this.socket.on("connect", () => {
            return this.setState({ selected_card: {} }, () => {
                setTimeout(() => {
                    this.socket.emit("set-active", { code: code, uid: id });
                }, 667);
                return this.handleGame(code, id);
            });
        });

    }

    handleTable = (game, round, prevRound, hand, prevHand, uid, connections) => {

        let sorted = rearrangePlayersOrder(game.players, uid);

        switch (game.players.length) {

            case 3:
                return <ThreePlayersTable game={game} round={round} prevRound={prevRound} hand={hand} prevHand={prevHand} players={sorted} connections={connections} />;
            case 4:
                return <FourPlayersTable game={game} round={round} prevRound={prevRound} hand={hand} prevHand={prevHand} players={sorted} connections={connections} />;
            case 5:
                return <FivePlayersTable game={game} round={round} prevRound={prevRound} hand={hand} prevHand={prevHand} players={sorted} connections={connections} />;
            case 6:
                return <SixPlayersTable game={game} round={round} prevRound={prevRound} hand={hand} prevHand={prevHand} players={sorted} connections={connections} />;
            default:
                return <ThreePlayersTable game={game} round={round} prevRound={prevRound} hand={hand} prevHand={prevHand} players={sorted} connections={connections} />;

        }

    }

    renderCards = (cards, game, round, hand, uid) => {

        let marginLeft = (((cards.length * 128) - this.state.inner_width) / cards.length);
        let canFit = cards.length * 128 < this.state.inner_width ? true : false;

        let sortedCards = sortCards(cards, round.trump);

        return sortedCards.map((card, index) => {
            if (this.state.selected_card.suit === card.suit && this.state.selected_card.value === card.value) {
                return(
                    <div style={canFit ? {zIndex: index+1} : {zIndex: index+1, marginLeft: index !== 0 ? -marginLeft : 0}} className="board-hand-selected-card-container" key={index} onClick={() => this.handle_card_send(card, index, game, uid)}>
                        <img className="board-hand-card" src={require(`../media/deck/${card.value}_${card.suit}.svg`)} alt="" />
                        <div className="selected-card-overlay">
                            <img src={require("../media/svgs/up-arrow.svg")} style={{width: 24, height: 24}} alt=""/>
                            <span>SAADA</span>
                        </div>
                    </div>
                );
            } else {
                return(
                    <div style={canFit ? {zIndex: index+1} : {zIndex: index+1, marginLeft: index !== 0 ? -marginLeft : 0}} className="board-hand-card-container" key={index} onClick={() => this.handle_card_select(card, round, hand, cards, uid)}>
                        <img className="board-hand-card" src={require(`../media/deck/${card.value}_${card.suit}.svg`)} alt="" />
                    </div>
                );
            }
        });

    }

    add_my_bet = (game_id, user_id, wins, round_id) => {

        if (!this.state.betting) {
            return this.setState({ betting: true }, () => {
                return addBet(game_id, user_id, wins)
                    .then(result => {
                        if (result.error) {
                            return this.setState({ betting: false }, () => {
                                return alert(result.message);
                            });
                        }
                        return this.setState({ wins: 0, betting: false });
                    });
            });
        }

    }

    handle_card_select = (card, round, hand, cards, uid) => {

        if (round.turn === uid && round.action === "call") {
            if (hand.cards.length < 1) {
                return this.setState({ selected_card: card });
            } else {

                let myBaseCards = cards.filter(c => c.suit === hand.base.suit);
                let myTrumpCards = cards.filter(c => c.suit === round.trump.suit);
                
                if (myBaseCards.length > 0) {
                    if (card.suit === hand.base.suit) {
                        return this.setState({ selected_card: card });
                    } else {
                        return alert("Palun käi masti");
                    }
                } else if (myTrumpCards.length > 0) {
                    if (card.suit === round.trump.suit) {
                        return this.setState({ selected_card: card });
                    } else {
                        return alert("Palun käi trumpi");
                    }
                } else {
                    return this.setState({ selected_card: card });
                }

            }
        } else {
            return alert("Veel ei ole sinu kord");
        }

    }

    handle_card_send = (c, c_index, game, uid) => {

        let card = { uid: uid, value: c.value, suit: c.suit };
            
        return this.props.removeCard(c_index)
            .then(_ => {
                return this.props.addCard(card);
            })
            .then(_ => {
                return this.props.setNextTurn(uid, "called")
                    .then(_ => {
                        return uploadCard(game, card)
                            .then(result => {
                                if (result.error) {
                                    return alert(result.message);
                                }
                                return this.setState({ selected_card: {} });
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
                    return this.props.resetRound();
                })
                .then(_ => {
                    return this.props.resetHands()
                        .then(_ => {
                            return this.props.resetCards();
                        })
                        .then(_ => {
                            return this.props.resetRoom()
                                .then(_ => {
                                    return this.props.resetUser();
                                })
                                .then(_ => {
                                    return this.props.history.push("/");
                                });
                        });
                });
        });

    }

    renderResults = (results) => {

        let to_be_sorted = results;

        let sorted = to_be_sorted.sort((a, b) => {

            if (a.points > b.points) return -1;
            if (a.points < b.points) return 1;

            return 0;

        });

        return sorted.map((result, index) => {
            return(
                <div key={index} className="final-pop-up-list-item">
                    <img src={result.image} alt="" />
                    <span>{result.name}</span>
                    <div className="final-pop-up-points-container">
                        <strong>{result.points}</strong>
                    </div>
                </div>
            );
        });

    }

    handleCardsContainerStyle = () => {

        if (isMobileSafari) {
            return { minHeight: 190, maxHeight: 190 };
        }

        if (isIOS && isMobile && isChrome) {
            return { minHeight: 190, maxHeight: 190 };
        }

        return { minHeight: 100, maxHeight: 100 };

    }

    render = () => {

        if (!this.state.loading) {

            let loser = this.props.game.data.isOver ? getSitaratas(this.props.game.data.players) : {};

            return(
                <Page title={this.props.round.data.turn === this.props.user.browser_id ? `Sinu kord | Mäng ${this.props.game.data.room_code}` : `Mäng ${this.props.game.data.room_code}`} icon={this.props.round.data.turn === this.props.user.browser_id ? require("../media/icos/favicon-alert.png") : require("../media/icos/favicon.png")}>
                    <div className="board-action-and-chat-container">
                        <Chat uid={this.props.user.browser_id} rid={this.props.game.data.room_code} />
                        <div className="board-action-container">
                            <div className="board-action-navigation-container">
                                <span className="board-action-navigation-title">MÄNG {this.props.game.data.room_code}</span>
                                <span className="board-action-navigation-subtitle">ROUND {this.props.game.data.round}/{totalRounds(this.props.game.data.players.length)}</span>
                            </div>
                            <div className="board-action-wrapper">
                                <div className="board-table-container">
                                    {this.handleTable(this.props.game.data, this.props.round.data, this.props.round.prev, this.props.hands.data, this.props.hands.prev, this.props.user.browser_id, this.props.socket.connections)}
                                    {
                                        !this.props.game.data.isOver && this.props.round.data.turn === this.props.user.browser_id && this.props.round.data.action === "guess" ?
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
                                                        <div className="guess-wins-footer-button-container" onClick={() => this.add_my_bet(this.props.game.data.room_code, this.props.user.browser_id, this.state.wins, this.props.round.data.round)}>
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
                                        this.props.round.data.turn === this.props.user.browser_id && this.props.round.data.action === "call" && !this.props.hands.data.winner ?
                                            <div className="hand-winner-overlay-container">
                                                <span><b>Sinu</b> kord</span>
                                            </div>
                                        :
                                            <div></div>
                                    }
                                </div>
                                <div className="board-hand-container" style={this.handleCardsContainerStyle()}>
                                    {
                                        this.props.game.data ?
                                            <div className="board-hand-cards-wrapper" style={{justifyContent: this.props.cards.data.length * 128 < this.state.inner_width ? "space-around" : "flex-start" }}>
                                                {this.renderCards(this.props.cards.data, this.props.game.data, this.props.round.data, this.props.hands.data, this.props.user.browser_id)}
                                            </div>
                                        :
                                            <div></div>
                                    } 
                                </div>
                            </div>
                            {   
                                this.props.game.data.isOver ?
                                    <div className="final-pop-up-container" style={{zIndex: 1000}}>
                                        <div className="final-pop-up-sitaratas-container">
                                            <img className="final-pop-up-sitaratas-image" src={loser.image} alt="" />
                                            <span className="final-pop-up-sitaratas-name"><span className="final-pop-up-sitaratas-title">Sitaratas:</span> {loser.name}</span>
                                            <div className="final-pop-up-signature-container">
                                                <span className="final-pop-up-signature-title">Allkiri</span>
                                                <div className="final-pop-up-signature"></div>
                                            </div>
                                            <div className="final-pop-up-list-container">
                                                <span className="final-pop-up-list-title">Lõplik järjestus</span>
                                                {this.renderResults(this.props.game.data.players)}
                                            </div>
                                            <div className="final-pop-up-exit-container">
                                                <div className="final-pop-up-exit-button-container" onClick={() => this.exitGame()}>
                                                    <span className="final-pop-up-exit-button-text">Välju</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                :
                                    <div></div>
                            }
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
        socket: state.socket,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({ resetRoom, setGame, updateGameHand, resetGame, setNextTurn, setRound, setPreviousRound, addMyBet, setHand, setPreviousHand, addCard, updateResults, setCards, removeCard, resetCards, resetHands, resetRound, resetUser, addWon, addHandWinner, setConnections }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);