const initialState = [
    {
        id: 1,
        name: "Superliga Mężczyzn",
        shortName: "Superliga",
        defaultPlace: {
            trainingPlace: false,
            homePlace: true,
        },
        details: {
            isLeague: true,
            sumTeamPoints: 8,
            sumSetPoints: 24,
        },
        numberOfThrowsInLane: [15, 15],
        howManyLanes: {
            question: "Ile torów",
            options: [
                {
                    key: 1,
                    label: "1 Tor",
                    numberOfLanes: 1,
                    numberOfLanesInForm: 1,
                    canWinDuel: false
                },
                {
                    key: 2,
                    label: "2 Tory",
                    numberOfLanes: 2,
                    numberOfLanesInForm: 2,
                    canWinDuel: false
                },
                {
                    key: 3,
                    label: "3 Tory",
                    numberOfLanes: 3,
                    numberOfLanesInForm: 3,
                    canWinDuel: false
                },
                {
                    key: 4,
                    label: "4 Tory",
                    numberOfLanes: 4,
                    numberOfLanesInForm: 4,
                    canWinDuel: true
                }
            ]
        }
    },
    {
        id: 2,
        name: "Superliga Kobiet",
        shortName: "Superliga",
        defaultPlace: {
            trainingPlace: false,
            homePlace: true,
        },
        details: {
            isLeague: true,
            sumTeamPoints: 6,
            sumSetPoints: 16,
        },
        numberOfThrowsInLane: [15, 15],
        howManyLanes: {
            question: "Ile torów",
            options: [
                {
                    key: 1,
                    label: "1 Tor",
                    numberOfLanes: 1,
                    numberOfLanesInForm: 1,
                    canWinDuel: false
                },
                {
                    key: 2,
                    label: "2 Tory",
                    numberOfLanes: 2,
                    numberOfLanesInForm: 2,
                    canWinDuel: false
                },
                {
                    key: 3,
                    label: "3 Tory",
                    numberOfLanes: 3,
                    numberOfLanesInForm: 3,
                    canWinDuel: false
                },
                {
                    key: 4,
                    label: "4 Tory",
                    numberOfLanes: 4,
                    numberOfLanesInForm: 4,
                    canWinDuel: true
                }
            ]
        }
    },
    {
        id: 3,
        name: "Centralna Liga Juniorów",
        shortName: "CLJ",
        defaultPlace: {
            trainingPlace: false,
            homePlace: true,
        },
        details: {
            isLeague: true,
            sumTeamPoints: 6,
            sumSetPoints: 16,
        },
        numberOfThrowsInLane: [15, 15],
        howManyLanes: {
            question: "Ile torów",
            options: [
                {
                    key: 1,
                    label: "1 Tor",
                    numberOfLanes: 1,
                    numberOfLanesInForm: 1,
                    canWinDuel: false
                },
                {
                    key: 2,
                    label: "2 Tory",
                    numberOfLanes: 2,
                    numberOfLanesInForm: 2,
                    canWinDuel: false
                },
                {
                    key: 3,
                    label: "3 Tory",
                    numberOfLanes: 3,
                    numberOfLanesInForm: 3,
                    canWinDuel: false
                },
                {
                    key: 4,
                    label: "4 Tory",
                    numberOfLanes: 4,
                    numberOfLanesInForm: 4,
                    canWinDuel: true
                }
            ]
        }
    },
    {
        id: 4,
        name: "Zawody",
        shortName: "Zawody",
        defaultPlace: {
            trainingPlace: false,
            homePlace: false,
        },
        details: {
            isLeague: false,
            sumTeamPoints: 0,
            sumSetPoints: 0,
        },
        numberOfThrowsInLane: [15, 15],
        howManyLanes: {
            question: "Rodzaj wprowadzania wyniku",
            options: [
                {
                    key: 0,
                    label: "Wynik końcowy",
                    numberOfLanes: 4,
                    numberOfLanesInForm: 0,
                    canWinDuel: false
                },
                {
                    key: 4,
                    label: "Szczegółowy wynik",
                    numberOfLanes: 4,
                    numberOfLanesInForm: 4,
                    canWinDuel: false
                }
            ]
        }
    },
    {
        id: 5,
        name: "Trening",
        shortName: "Trening",
        defaultPlace: {
            trainingPlace: true,
            homePlace: false,
        },
        details: {
            isLeague: false,
            sumTeamPoints: 0,
            sumSetPoints: 0,
        },
        numberOfThrowsInLane: [15, 15],
        howManyLanes: {
            question: "Rodzaj wprowadzania wyniku",
            options: [
                {
                    key: 0,
                    label: "Wynik końcowy 120 rzutów",
                    numberOfLanes: 4,
                    numberOfLanesInForm: 0,
                    canWinDuel: false
                },
                {
                    key: 1,
                    label: "Wynik 1 toru",
                    numberOfLanes: 1,
                    numberOfLanesInForm: 1,
                    canWinDuel: false
                },
                {
                    key: 2,
                    label: "Wynik 2 torów",
                    numberOfLanes: 2,
                    numberOfLanesInForm: 2,
                    canWinDuel: false
                },
                {
                    key: 3,
                    label: "Wynik 3 torów",
                    numberOfLanes: 3,
                    numberOfLanesInForm: 3,
                    canWinDuel: false
                },
                {
                    key: 4,
                    label: "Wynik 4 torów",
                    numberOfLanes: 4,
                    numberOfLanesInForm: 4,
                    canWinDuel: false
                },
                {
                    key: 5,
                    label: "Wynik 5 torów",
                    numberOfLanes: 5,
                    numberOfLanesInForm: 5,
                    canWinDuel: false
                },
                {
                    key: 6,
                    label: "Wynik 6 torów",
                    numberOfLanes: 6,
                    numberOfLanesInForm: 6,
                    canWinDuel: false
                }
            ]
        }
    }
]

const listOfGameTypes = function (state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default listOfGameTypes;