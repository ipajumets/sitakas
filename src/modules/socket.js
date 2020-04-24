export const SET_SOCKET = "SET_SOCKET";
export const SET_CONNECTIONS = "SET_CONNECTIONS";

const initialState = {
    channel: null,
    connections: [],
};

export default (state = initialState, action) => {

    switch (action.type) {

        case SET_SOCKET:
            
            return {
                ...state,
                channel: action.data,
            };
        
        case SET_CONNECTIONS:
        
            return {
                ...state,
                connections: action.data,
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

export let setConnections = (data) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: SET_CONNECTIONS,
            data,
        }));
    });

}