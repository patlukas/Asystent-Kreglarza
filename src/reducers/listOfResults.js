import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = []

const exampleState = [
    {
        id: 1,
        gameType: {
            id: 1,
            name: "Superliga",
            keyHowManyLanes: 4,
            isLeague: true
        },
        date: 19302, //liczba dni od 01.01.1970
        leagueData: {
            team: {
                sum: 3561,
                teamPoints: [1, 7],
                setPoints: [1, 23],
            },
            player: {
                canWinDuel: true,
                teamPoints: 0.5,
                setPoints: [2, 1, 0, 1, 0]
            },
            enemyTeam: [-1, "z Zerbst"],
            inHome: true,
        },
        results: {
            suma: [600, 150, 151, 147, 152],
            pelne: [400, 99, 101, 98, 102],
            zbierane: [200, 51, 50, 49, 50],
            dziury: [3, 0, 1, 0, 2],
        },
        lanes: {
            numberOfLanes: 4,
            numberOfLanesInForm: 4,
            numberOfThrowsInLane: [15, 15]
        },
        where: [1, "w Gostyniu"],
        comment: "",
        season: "2022/2023"
    },
    {
        id: 2,
        gameType: {
            id: 2,
            name: "Superliga",
            keyHowManyLanes: 4,
            isLeague: true
        },
        date: 19305, //liczba dni od 01.01.1970
        leagueData: {
            team: {
                sum: 3561,
                teamPoints: [1.5, 6.5],
                setPoints: [12.5, 11.5],
            },
            player: {
                canWinDuel: true,
                teamPoints: 0.5,
                setPoints: [2, 1, 0, 1, 0]
            },
            enemyTeam: [2, "z Tarnowem Podgórnym"],
            inHome: true,
        },
        results: {
            suma: [600, 150, 151, 147, 152],
            pelne: [400, 99, 101, 98, 102],
            zbierane: [200, 51, 50, 49, 50],
            dziury: [3, 0, 1, 0, 2],
        },
        lanes: {
            numberOfLanes: 4,
            numberOfLanesInForm: 4,
            numberOfThrowsInLane: [15, 15]
        },
        where: [2, "w Tarnowie Podgórnym"],
        comment: "WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW ",
        season: "2022/2023"
    },
    {
        id: 3,
        gameType: {
            id: 3,
            name: "Zawody",
            keyHowManyLanes: 4,
            isLeague: true
        },
        date: 19306, //liczba dni od 01.01.1970
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
            suma: [600, 150, 151, 147, 152],
            pelne: [400, 99, 101, 98, 102],
            zbierane: [200, 51, 50, 49, 50],
            dziury: [3, 0, 1, 0, 2],
        },
        lanes: {
            numberOfLanes: 4,
            numberOfLanesInForm: 4,
            numberOfThrowsInLane: [15, 15]
        },
        where: [2, "w Tarnowie Podgórnym"],
        comment: "WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW ",
        season: "2022/2023"
    },
    {
        id: 4,
        gameType: {
            id: 4,
            name: "Trening",
            keyHowManyLanes: 4,
            isLeague: false
        },
        date: 19306, //liczba dni od 01.01.1970
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
            suma: [600, 150, 151, 147, 152],
            pelne: [400, 99, 101, 98, 102],
            zbierane: [200, 51, 50, 49, 50],
            dziury: [3, 0, 1, 0, 2],
        },
        lanes: {
            numberOfLanes: 4,
            numberOfLanesInForm: 4,
            numberOfThrowsInLane: [15, 15]
        },
        where: [2, "w Tarnowie Podgórnym"],
        comment: "WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW ",
        season: "2022/2023"
    }
]

const save = async (value) => {
    if(new Blob([JSON.stringify(value)]).size > 2097002) {
        alert("Nie udało się zapisać wyniku, \nbo zabrakło pamięci.")
        return
    }
    try {await AsyncStorage.setItem('@listOfResults', JSON.stringify(value))
    } catch (e) {console.log(e)}
}

const sortList = (a, b) => {
    if(a.date != b.date) return b.date - a.date
    return b.id-a.id
}

const resultsList = function (state = initialState, action) {
    switch (action.type) {
        case "SET_LIST_RESULTS":
            var newState = [...action.payload.listOfResults]
            // for(let i=0; i<2000; i++) {
            //     let el = JSON.parse(JSON.stringify(newState[0]))
            //     el.id = 1000 + i
            //     newState.push(el)
            // }
            return newState
        case "DELETE_RESULT":
            const {idDeleteResult} = action.payload
            var newState = [...state]
            for(let i=0; i<newState.length; i++) {
                if(newState[i].id === idDeleteResult) {
                    newState.splice(i, 1)
                    break
                }
            }
            save(newState)
            return newState
        case "SAVE_EDIT_RESULT":
            const {resultAfterEdit} = action.payload
            var newState = [...state]
            for(let i=0; i<newState.length; i++) {
                if(newState[i].id === resultAfterEdit.id) {
                    newState[i] = resultAfterEdit
                    break
                }
            }
            save(newState)
            newState.sort(sortList)
            return newState
        case "CREATE_NEW_RESULT":
            var newState = [...state]
            let newResult = action.payload.resultItem
            let newId = 1
            newState.forEach((el) => {if(el.id >= newId) newId = el.id+1})
            newResult.id = newId
            newState.push(newResult)
            save(newState)
            newState.sort(sortList)
            return newState
        default:
            return state;
    }
}

export default resultsList;