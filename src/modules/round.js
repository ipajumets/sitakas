export const SET_ROUND = "SET_ROUND";
export const SET_PREVIOUS_ROUND = "SET_PREVIOUS_ROUND";
export const ADD_MY_BET = "ADD_MY_BET";
export const UPDATE_RESULTS = "UPDATE_RESULTS";
export const SET_NEXT_TURN = "SET_NEXT_TURN";
export const ADD_WON = "ADD_WON";
export const RESET_ROUND = "RESET_ROUND";

const initialState = {
    data: null,
    prev: null,
};

export default (state = initialState, action) => {

    switch (action.type) {

        case SET_ROUND:
            
            return {
                ...state,
                data: action.round,
            };
        
        case SET_PREVIOUS_ROUND:
        
            return {
                ...state,
                prev: action.data,
            };

        case ADD_MY_BET:
        
            return {
                ...state,
                data: {
                    ...state.data,
                    results: [action.data, ...state.data.results],
                },
            };

        case ADD_WON:

            return {
                ...state,
                data: {
                    ...state.data,
                    results: state.data.results.map(result => {
                        if (result.uid === action.uid) {
                            return {
                                ...result,
                                won: result.won+1,
                            }
                        } else {
                            return result;
                        }
                    }),
                },
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

        case UPDATE_RESULTS:
        
            return {
                ...state,
                data: {
                    ...state.data,
                    results: action.results,
                },
            };
        
        case RESET_ROUND:
        
            return {
                data: null,
            };
        
        default:
            return state;
    }

};

export let setRound = (round) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: SET_ROUND,
            round,
        }));
    });

}

export let setPreviousRound = (data) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: SET_PREVIOUS_ROUND,
            data,
        }));
    });

}

export let addMyBet = (data) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: ADD_MY_BET,
            data,
        }));
    });

}

export let updateResults = (results) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: UPDATE_RESULTS,
            results,
        }));
    });

}

export let addWon = (uid) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: ADD_WON,
            uid,
        }));
    });

}

export let resetRound = () => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: RESET_ROUND,
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