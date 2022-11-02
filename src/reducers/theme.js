import {colors} from "../styles/colors";

const initialState = {
    listTheme: [],
    selectedTheme: "dark",
    colors: {}
}

const theme = function (state = initialState, action) {
    switch (action.type) {
        case "CHANGE_THEME":
            var stateNew = {...state};
            if(stateNew.selectedTheme == "dark") stateNew.selectedTheme = "light";
            else stateNew.selectedTheme = "dark";
            stateNew.colors = colors[stateNew.selectedTheme];
            return stateNew;
        default:
            var stateN = {...state};
            stateN.colors = colors[stateN.selectedTheme];
            return stateN;
    }
}

export default theme;