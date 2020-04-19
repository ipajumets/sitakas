export const SET_USER_BROWSER_ID = "SET_USER_BROWSER_ID";
export const SET_USER = "SET_USER";
export const RESET_USER = "RESET_USER";
export const SET_USER_STATUS = "SET_USER_STATUS";

const initialState = {
    browser_id: null,
    room_code: null,
    name: "",
    isReady: false,
};

export default (state = initialState, action) => {

    switch (action.type) {

        case SET_USER_BROWSER_ID:
            
            return {
                ...state,
                browser_id: action.id,
            };
        
        case SET_USER:
        
            return {
                browser_id: action.data.browser_id,
                room_code: action.data.room_code,
                name: action.data.name,
                isReady: action.data.isReady,
            };

        case SET_USER_STATUS:
        
            return {
                ...state,
                isReady: action.status,
            };

        case RESET_USER:
    
            return {
                ...state,
                room_code: null,
                name: "",
                isReady: false,
            };
        
        default:
            return state;
    }

};

export let setUserBrowserID = (id) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: SET_USER_BROWSER_ID,
            id,
        }));
    });

}

export let setUser = (data) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: SET_USER,
            data,
        }));
    });

}

export let setUserStatus = (status) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: SET_USER_STATUS,
            status,
        }));
    });

}

export let resetUser = () => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: RESET_USER,
        }));
    });

}