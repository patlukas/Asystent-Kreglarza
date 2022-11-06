import { combineReducers } from "redux";
import listOfResults from "./listOfResults";
import selectedWindow from "./selectedWindow";
import theme from "./theme";
import listOfGameTypes from "./listOfGameTypes";

export default combineReducers({
    listOfResults,
    selectedWindow,
    theme,
    listOfGameTypes
})