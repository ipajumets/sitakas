export const SET_MESSAGES = "SET_MESSAGES";
export const ADD_MESSAGE = "ADD_MESSAGE";

const initialState = {
    data: [],
    fetching: true,
};

export default (state = initialState, action) => {

    switch (action.type) {

        case SET_MESSAGES:
            
            return {
                ...state,
                data: action.data,
                fetching: false,
            };

        case ADD_MESSAGE:
        
            return {
                ...state,
                data: [...state.data, action.data],
            };
        
        default:
            return state;
    }

};

export let setMessages = (data) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: SET_MESSAGES,
            data,
        }));
    });

}

export let addMessage = (data) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: ADD_MESSAGE,
            data,
        }));
    });

}