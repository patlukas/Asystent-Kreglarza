import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    homePlace: [],
    trainingPlace: [],
    sortValue: 'date_gain',
    filter: {
        gameTypes: [
            {value: true, listId: [1, 2], name: "Superliga"},
            {value: true, listId: [3], name: "CLJ"},
            {value: true, listId: [4], name: "Zawody"},
            {value: true, listId: [5], name: "Trening"},
        ],
        whereIndex: 0,
        enemyIndex: 0,
        fullGame: false
    }
}

const save = async (value) => {
    try {await AsyncStorage.setItem('@settings', JSON.stringify(value))
    } catch (e) {console.log(e)}
}

const settings = function (state = initialState, action) {
    let newState = {...state}
    switch (action.type) {
        case "LOAD_SETTINGS":
            var load = action.payload.settings
            if(load.filter === undefined) load.filter = initialState.filter
            return load
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
        case "SET_FILTER":
            newState.filter = action.payload.filter
            save(newState)
            return newState
        default:
            return state;
    }
}

export default settings;