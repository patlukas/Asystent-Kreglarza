import { combineReducers } from "redux";
import listOfResults from "./listOfResults";
import selectedWindow from "./selectedWindow";
import theme from "./theme";
import listOfGameTypes from "./listOfGameTypes";
import createResult from "./createResult";
import whereAndEnemy from "./whereAndEnemy";
import settings from "./settings";

export default combineReducers({
    listOfResults,
    selectedWindow,
    theme,
    listOfGameTypes,
    createResult,
    whereAndEnemy,
    settings
})