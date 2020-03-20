import { combineReducers } from "redux";

import room from "./modules/room";
import user from "./modules/user";
import game from "./modules/game";
import cards from "./modules/cards";
import round from "./modules/round";
import hands from "./modules/hands";

const rootReducer = combineReducers({
    room,
    user,
    game,
    cards,
    round,
    hands,
});

export default rootReducer;