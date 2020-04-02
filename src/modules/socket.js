export const SET_SOCKET = "SET_SOCKET";

const initialState = {
    channel: null,
};

export default (state = initialState, action) => {

    switch (action.type) {

        case SET_SOCKET:
            
            return {
                ...state,
                channel: action.data,
            };
        
        default:
            return state;
    }

};

export let setSocket = (data) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: SET_SOCKET,
            data,
        }));
    });

}