export const SET_ROOM = "SET_ROOM";
export const SET_ROOM_WITH_PLAYERS = "SET_ROOM_WITH_PLAYERS";
export const RESET_ROOM = "RESET_ROOM";
export const SET_PLAYERS = "SET_PLAYERS";
export const ADD_PLAYER = "ADD_PLAYER";
export const REMOVE_PLAYER = "REMOVE_PLAYER";
export const SET_PRIVACY = "SET_PRIVACY";
export const SET_JOKERS = "SET_JOKERS";
export const SET_MAX_PLAYERS = "SET_MAX_PLAYERS";
export const SET_SPORT = "SET_SPORT";

const initialState = {
    code: null,
    host_browser_id: null,
    players: [],
    privacy: "private",
    jokers: false,
    maxPlayers: 4,
    sport: "basketball",
};

export default (state = initialState, action) => {

    switch (action.type) {

        case SET_ROOM:
            
            return {
                ...state,
                code: action.code,
                host_browser_id: action.id,
                privacy: action.privacy,
                jokers: action.jokers,
                maxPlayers: action.maxPlayers,
                sport: action.sport,
            };

        case SET_ROOM_WITH_PLAYERS:
        
            return {
                ...state,
                code: action.room.code,
                host_browser_id: action.room.host_browser_id,
                privacy: action.room.privacy,
                jokers: action.room.jokers,
                maxPlayers: action.room.maxPlayers,
                players: action.players,
                sport: action.room.sport,
            };

        case SET_PLAYERS:
        
            return {
                ...state,
                players: action.data,
            };

        case SET_PRIVACY:
    
            return {
                ...state,
                privacy: action.privacy,
            };

        case SET_JOKERS:

            return {
                ...state,
                jokers: action.jokers,
            };

        case SET_MAX_PLAYERS:
    
            return {
                ...state,
                maxPlayers: action.amount,
            };

        case SET_SPORT:
    
            return {
                ...state,
                sport: action.data,
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
                    if (player.browser_id) {
                        return player.browser_id !== action.id;
                    }
                    return player.uid !== action.id;
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

export let setRoomWithPlayers = (room, players) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: SET_ROOM_WITH_PLAYERS,
            room,
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

export let setPrivacy = (privacy) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: SET_PRIVACY,
            privacy,
        }));
    });

}

export let setJokers = (jokers) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: SET_JOKERS,
            jokers,
        }));
    });

}

export let setMaxPlayers = (amount) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: SET_MAX_PLAYERS,
            amount,
        }));
    });

}

export let setSport = (data) => dispatch => {

    return new Promise(resolve => {
        return resolve(dispatch({
            type: SET_SPORT,
            data,
        }));
    });

}