import { combineReducers } from "redux";

import room from "./modules/room";
import user from "./modules/user";
import game from "./modules/game";
import cards from "./modules/cards";
import round from "./modules/round";
import hands from "./modules/hands";
import socket from "./modules/socket";

const rootReducer = combineReducers({
    room,
    user,
    game,
    cards,
    round,
    hands,
    socket,
});

export default rootReducer;