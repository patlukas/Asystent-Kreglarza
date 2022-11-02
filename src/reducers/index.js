import { combineReducers } from "redux";
import resultsList from "./resultsList";
import selectedWindow from "./selectedWindow";
import theme from "./theme";

export default combineReducers({
    resultsList,
    selectedWindow,
    theme
})