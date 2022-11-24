const clearResult = {
    id: -1,
    gameType: {
        id: -1,
        name: "",
        keyHowManyLanes: -1
    },
    date: -1, //liczba dni od 01.01.1970
    leagueData: {
        team: {
            sum: -1,
            teamPoints: -1,
            setPoints: [1, 23]-1,
        },
        player: {
            teamPoints: -1,
            setPoints: []
        },
        enemyTeam: -1,
        inHome: -1,
    },
    results: {
        suma: [],
        pelne: [],
        zbierane: [],
        dziury: [],
    },
    numberOfLanes: -1,
    numberOfThrowsInLane: -1,
    where: -1,
    comment: "",
    season: ""
};

const initialState = {...clearResult};

const createResult = function (state = initialState, action) {
    switch (action.type) {
        case "EDIT_CREATE_RESULT":
            console.log("EDYCJA")
            let stateNew = {...action.payload.resultItem}
            return stateNew;
        default:
            return state;
    }
}

export default createResult;