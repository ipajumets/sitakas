export const SET_GAME = "SET_GAME";
export const SET_NEXT_TURN = "SET_NEXT_TURN";
export const RESET_GAME = "RESET_GAME";

const initialState = {
    data: null,
};

export default (state = initialState, action) => {

    switch (action.type) {

        case SET_GAME:
            
            return {
                ...state,
                data: {
                    ...action.game,
                    round: handleRound(action.game.round, action.game.players.length),
                    over: handleOver(action.game.round, action.game.players.length),
                },
            };

        case RESET_GAME:
        
            return {
                data: null,
            };

        case SET_NEXT_TURN:
        
            return {
                ...state,
                data: {
                    ...state.data,
                    "turn": action.uid,
                    "action": action.step,
                },
            };
        
        default:
            return state;
    }

};

export let setGame = (game) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: SET_GAME,
            game,
        }));
    });

}

export let resetGame = () => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: RESET_GAME,
        }));
    });

}

export let setNextTurn = (uid, step) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: SET_NEXT_TURN,
            uid,
            step,
        }));
    });

}

// What round is currently on?
let handleRound = (round, players) => {

    switch (players) {

        case 3:
            return round < 30 ? round : 29;
        case 4:
            return round < 27 ? round : 26;

    }

}

// Is the game over?
let handleOver = (round, players) => {

    switch (players) {

        case 3:
            return round > 29 ? true : false;
        case 4:
            return round > 26 ? true : false;

    }

}