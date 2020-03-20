export const SET_USER_BROWSER_ID = "SET_USER_BROWSER_ID";
export const SET_USER = "SET_USER";
export const RESET_USER = "RESET_USER";

const initialState = {
    browser_id: null,
    room_code: null,
    name: "",
    active: true,
    points: 0,
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
                active: action.data.active,
                points: action.data.points,
            };

        case RESET_USER:
    
            return {
                ...state,
                room_code: null,
                name: "",
                active: true,
                points: 0,
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

export let resetUser = () => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: RESET_USER,
        }));
    });

}