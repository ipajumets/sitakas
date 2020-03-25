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
                data: action.game,
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