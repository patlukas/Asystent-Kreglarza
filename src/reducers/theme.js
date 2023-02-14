import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from "../styles/colors";

const initialState = {
    listTheme: ["Ciemny", "Jasny"],
    selectedTheme: "Ciemny",
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
            let newTheme = stateNew.listTheme[0]
            stateNew.listTheme.forEach(theme => {
                if(theme == action.payload.theme) newTheme = theme 
            })
            stateNew.selectedTheme = newTheme
            stateNew.colors = colors[newTheme];
            save(newTheme)
            return stateNew
        default:
            var stateN = {...state};
            stateN.colors = colors[stateN.selectedTheme];
            return stateN;
    }
}

export default theme;