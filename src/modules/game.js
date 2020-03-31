export const SET_GAME = "SET_GAME";
export const UPDATE_GAME_HAND = "UPDATE_GAME_HAND";
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

        case UPDATE_GAME_HAND:
        
            return {
                ...state,
                data: {
                    ...state.data,
                    hand: action.hand,
                },
            };

        case RESET_GAME:
        
            return {
                data: null,
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

export let updateGameHand = (hand) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: UPDATE_GAME_HAND,
            hand,
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