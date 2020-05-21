export const SET_MESSAGES = "SET_MESSAGES";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const TOGGLE_MOBILE = "TOGGLE_MOBILE";
export const NEW_MESSAGE_ALERT = "NEW_MESSAGE_ALERT";

const initialState = {
    data: [],
    fetching: true,
    showMobile: false,
    alert: false,
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
                alert: true,
            };
        
        case TOGGLE_MOBILE:
    
            return {
                ...state,
                showMobile: !state.showMobile,
            };

        case NEW_MESSAGE_ALERT:

            return {
                ...state,
                alert: action.data,
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

export let toggleMobileChat = () => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: TOGGLE_MOBILE,
        }));
    });

}

export let setNewMessageAlert = (data) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: NEW_MESSAGE_ALERT,
            data,
        }));
    });

}