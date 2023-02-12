import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from "../styles/colors";

const initialState = {
    listTheme: [],
    selectedTheme: "dark",
    colors: {}
}

const save = async (value) => {
    try {await AsyncStorage.setItem('@theme', value)
    } catch (e) {console.log(e)}
}

const theme = (state = initialState, action) => {
    switch (action.type) {
        case "SET_THEME":
            var stateNew = {...state}
            stateNew.selectedTheme = action.payload.theme
            stateNew.colors = colors[stateNew.selectedTheme];
            return stateNew
        case "CHANGE_THEME":
            var stateNew = {...state};
            if(stateNew.selectedTheme == "dark") stateNew.selectedTheme = "light";
            else stateNew.selectedTheme = "dark";
            stateNew.colors = colors[stateNew.selectedTheme];
            save(stateNew.selectedTheme)
            return stateNew;
        default:
            var stateN = {...state};
            stateN.colors = colors[stateN.selectedTheme];
            return stateN;
    }
}

export default theme;