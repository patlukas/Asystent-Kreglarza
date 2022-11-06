const initialState = [
    {
        id: 1,
        name: "Superliga Mężczyzn",
        shortName: "Superliga",
        defaultPlace: {
            trainingPlace: false,
            homePlace: true,
        },
        isLeague: true,
        numberOfThrowsInLane: [15, 15],
        howManyLanes: {
            question: "Ile torów",
            options: [
                {
                    key: 1,
                    label: "1 Tor",
                    numberOfLanes: 1,
                    numberOfLanesInForm: 1
                },
                {
                    key: 4,
                    label: "4 Tory",
                    numberOfLanes: 4,
                    numberOfLanesInForm: 4
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