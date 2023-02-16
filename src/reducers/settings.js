import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    homePlace: [],
    trainingPlace: [],
    sortValue: 'date_gain'
}

const save = async (value) => {
    try {await AsyncStorage.setItem('@settings', JSON.stringify(value))
    } catch (e) {console.log(e)}
}

const settings = function (state = initialState, action) {
    let newState = {...state}
    switch (action.type) {
        case "LOAD_SETTINGS":
            return action.payload.settings
        case "SET_TRAINING_PLACE":
            newState.trainingPlace = action.payload.trainingPlace
            save(newState)
            return newState
        case "SET_HOME_PLACE":
            newState.homePlace = action.payload.homePlace
            save(newState)
            return newState
        case "SET_SORT_VALUE":
            newState.sortValue = action.payload.sortValue
            save(newState)
            return newState
        default:
            return state;
    }
}

export default settings;