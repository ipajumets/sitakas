export const SET_HAND = "SET_HAND";
export const ADD_CARD = "ADD_CARD";
export const ADD_HAND_WINNER = "ADD_HAND_WINNER";
export const RESET_HANDS = "RESET_HANDS";

const initialState = {
    data: null,
};

export default (state = initialState, action) => {

    switch (action.type) {

        case SET_HAND:
            
            return {
                ...state,
                data: action.hand,
            };

        case ADD_CARD:
        
            return {
                ...state,
                data: {
                    ...state.data,
                    cards: [action.card, ...state.data.cards],
                    base: !state.data.base ? action.card : state.data.base,
                },
            };
    
        case ADD_HAND_WINNER:
    
            return {
                ...state,
                data: {
                    ...state.data,
                    winner: action.card,
                },
            };

        case RESET_HANDS:

            return {
                data: null,
            };
        
        default:
            return state;
    }

};

export let setHand = (hand) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: SET_HAND,
            hand,
        }));
    });

}

export let addCard = (card) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: ADD_CARD,
            card,
        }));
    });

}

export let addHandWinner = (card) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: ADD_HAND_WINNER,
            card,
        }));
    });

}

export let resetHands = () => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: RESET_HANDS,
        }));
    });

}