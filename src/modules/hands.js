export const SET_HAND = "SET_HAND";
export const SET_PREVIOUS_HAND = "SET_PREVIOUS_HAND";
export const ADD_CARD = "ADD_CARD";
export const ADD_HAND_WINNER = "ADD_HAND_WINNER";
export const RESET_HANDS = "RESET_HANDS";

const initialState = {
    data: null,
    prev: null,
};

export default (state = initialState, action) => {

    switch (action.type) {

        case SET_HAND:
            
            return {
                ...state,
                data: action.hand,
            };
        
        case SET_PREVIOUS_HAND:
        
            return {
                ...state,
                prev: action.data,
            };

        case ADD_CARD:
        
            return {
                ...state,
                data: {
                    ...state.data,
                    cards: [action.card, ...state.data.cards],
                    base: state.data.base ? state.data.base : action.card.value !== 15 ? action.card : null,
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

export let setPreviousHand = (data) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: SET_PREVIOUS_HAND,
            data,
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