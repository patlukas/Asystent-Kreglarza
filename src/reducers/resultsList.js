const initialState = [

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