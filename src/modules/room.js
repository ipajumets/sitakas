export const SET_ROOM = "SET_ROOM";
export const SET_ROOM_WITH_PLAYERS = "SET_ROOM_WITH_PLAYERS";
export const RESET_ROOM = "RESET_ROOM";
export const SET_PLAYERS = "SET_PLAYERS";
export const ADD_PLAYER = "ADD_PLAYER";
export const REMOVE_PLAYER = "REMOVE_PLAYER";

const initialState = {
    code: null,
    host_browser_id: null,
    players: [],
};

export default (state = initialState, action) => {

    switch (action.type) {

        case SET_ROOM:
            
            return {
                ...state,
                code: action.code,
                host_browser_id: action.id,
            };

        case SET_ROOM_WITH_PLAYERS:
        
            return {
                ...state,
                code: action.code,
                host_browser_id: action.id,
                players: action.players,
            };

        case SET_PLAYERS:
        
            return {
                ...state,
                players: action.data,
            };

        case ADD_PLAYER:
    
            return {
                ...state,
                players: [...state.players, action.player],
            };
        
        case REMOVE_PLAYER:

            return {
                ...state,
                players: state.players.filter(player => {
                    return player.browser_id !== action.id;
                }),
            };

        case RESET_ROOM:

            return {
                code: null,
                host_browser_id: null,
                players: [],
            };
        
        default:
            return state;
    }

};

export let setRoom = (code, id) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: SET_ROOM,
            code,
            id,
        }));
    });

}

export let setRoomWithPlayers = (code, id, players) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: SET_ROOM_WITH_PLAYERS,
            code,
            id,
            players,
        }));
    });

}

export let resetRoom = () => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: RESET_ROOM,
        }));
    });

}

export let setPlayers = (data) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: SET_PLAYERS,
            data,
        }));
    });

}

export let addPlayer = (player) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: ADD_PLAYER,
            player,
        }));
    });

}

export let removePlayer = (id) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: REMOVE_PLAYER,
            id,
        }));
    });

}