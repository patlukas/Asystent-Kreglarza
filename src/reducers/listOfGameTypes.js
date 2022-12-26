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
                    key: 4,
                    label: "4 Tory",
                    numberOfLanes: 4,
                    numberOfLanesInForm: 4,
                    canWinDuel: true
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