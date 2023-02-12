import AsyncStorage from '@react-native-async-storage/async-storage';
const clearResult = {
    id: -1,
    gameType: {
        id: -1,
        name: "",
        keyHowManyLanes: -1,
        isLeague: false
    },
    date: -1, //liczba dni od 01.01.1970
    leagueData: {
        team: {
            sum: -1,
            teamPoints: [],
            setPoints: [],
        },
        player: {
            canWinDuel: false,
            teamPoints: -1,
            setPoints: []
        },
        enemyTeam: [],
        inHome: -1,
    },
    results: {
        suma: [],
        pelne: [],
        zbierane: [],
        dziury: [],
    },
    lanes: {
        numberOfLanes: -1,
        numberOfLanesInForm: -1,
        numberOfThrowsInLane: []
    },
    where: [],
    comment: "",
    season: ""
};

const initialState = {...clearResult};

const save = async (value) => {
    try {await AsyncStorage.setItem('@createResult', JSON.stringify(value))
    } catch (e) {console.log(e)}
}

const createResult = function (state = initialState, action) {
    switch (action.type) {
        case "SET_CREATE_RESULT":
            return action.payload.createResult
        case "EDIT_CREATE_RESULT":
            let stateNew = {...action.payload.resultItem}
            save(stateNew)
            return stateNew;
        default:
            return state;
    }
}

export default createResult;