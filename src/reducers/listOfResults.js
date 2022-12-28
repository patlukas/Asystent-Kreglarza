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
                sum: 3561,
                teamPoints: [1, 7],
                setPoints: [1, 23],
            },
            player: {
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
        numberOfLanes: 4,
        numberOfThrowsInLane: [15, 15],
        where: [1, "w Gostyniu"],
        comment: "",
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
                sum: 3561,
                teamPoints: [1.5, 6.5],
                setPoints: [12.5, 11.5],
            },
            player: {
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
        numberOfLanes: 4,
        numberOfThrowsInLane: [15, 15],
        where: [2, "w Tarnowie Podgórnym"],
        comment: "WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW ",
        season: "2022/2023"
    },
    {
        id: 3,
        gameType: {
            id: 3,
            name: "Zawody",
            keyHowManyLanes: 4
        },
        date: 19306, //liczba dni od 01.01.1970
        leagueData: null,
        results: {
            suma: [600, 150, 151, 147, 152],
            pelne: [400, 99, 101, 98, 102],
            zbierane: [200, 51, 50, 49, 50],
            dziury: [3, 0, 1, 0, 2],
        },
        numberOfLanes: 4,
        numberOfThrowsInLane: [15, 15],
        where: [2, "w Tarnowie Podgórnym"],
        comment: "WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW ",
        season: "2022/2023"
    },
    {
        id: 4,
        gameType: {
            id: 4,
            name: "Trening",
            keyHowManyLanes: 4
        },
        date: 19306, //liczba dni od 01.01.1970
        leagueData: null,
        results: {
            suma: [600, 150, 151, 147, 152],
            pelne: [400, 99, 101, 98, 102],
            zbierane: [200, 51, 50, 49, 50],
            dziury: [3, 0, 1, 0, 2],
        },
        numberOfLanes: 4,
        numberOfThrowsInLane: [15, 15],
        where: [2, "w Tarnowie Podgórnym"],
        comment: "WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW WWWWW ",
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