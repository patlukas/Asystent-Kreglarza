const initialState = [
    {
        id: 1,
        gameType: {
            id: 1,
            name: "Superliga",
            keyHowManyLanes: 4
        },
        date: 19302, //liczba dni od 01.01.1970
        leagueData: {
            team: {
                teamSum: 3561,
                teamPoints: [1.5, 6.5],
                setPoints: [12.5, 11.5],
            },
            player: {
                teamPoints: 0.5,
                setPoints: [2, 1, 0, 1, 0]
            },
            enemyTeam: [false, "z Zerbst"],
            inHome: true,
        },
        results: {
            suma: [600, 150, 151, 147, 152],
            pelne: [400, 99, 101, 98, 102],
            zbierane: [200, 51, 50, 49, 50],
            dziury: [3, 0, 1, 0, 2],
        },
        numberOfLanes: 4,
        numberOfThrowsInLane: [15, 15],
        where: [true, "w Gostyniu"],
        comment: "Pogoda była zła i tory były złe",
        season: "2022/2023"
    },
    {
        id: 2,
        gameType: {
            id: 2,
            name: "Superliga",
            keyHowManyLanes: 4
        },
        date: 19305, //liczba dni od 01.01.1970
        leagueData: {
            team: {
                teamSum: 3561,
                teamPoints: [1.5, 6.5],
                setPoints: [12.5, 11.5],
            },
            player: {
                teamPoints: 0.5,
                setPoints: [2, 1, 0, 1, 0]
            },
            enemyTeam: [false, "z Tarnowem Podgórnym"],
            inHome: true,
        },
        results: {
            suma: [600, 150, 151, 147, 152],
            pelne: [400, 99, 101, 98, 102],
            zbierane: [200, 51, 50, 49, 50],
            dziury: [3, 0, 1, 0, 2],
        },
        numberOfLanes: 4,
        numberOfThrowsInLane: [15, 15],
        where: [true, "w Tarnowie Podgórnym"],
        comment: "Pogoda była zła i tory były złe",
        season: "2022/2023"
    }
]

const resultsList = function (state = initialState, action) {
    switch (action.type) {
        case "GET_LIST":
            return state;
        default:
            return state;
    }
}

export default resultsList;