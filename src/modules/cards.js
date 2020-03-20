export const SET_CARDS = "SET_CARDS";
export const REMOVE_CARD = "REMOVE_CARD";
export const RESET_CARDS = "RESET_CARDS";

const initialState = {
    data: [],
};

export default (state = initialState, action) => {

    switch (action.type) {

        case SET_CARDS:
            
            return {
                ...state,
                data: action.cards,
            };

        case REMOVE_CARD:
        
            return {
                ...state,
                data: state.data.filter((_, index) => {
                    return index !== action.index;
                }),
            };

        case RESET_CARDS:
    
            return {
                data: [],
            };
        
        default:
            return state;
    }

};

export let setCards = (cards) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: SET_CARDS,
            cards,
        }));
    });

}

export let removeCard = (index) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: REMOVE_CARD,
            index,
        }));
    });

}

export let resetCards = () => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: RESET_CARDS,
        }));
    });

}