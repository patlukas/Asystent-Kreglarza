const initialState = 3;

const selectedWindow = function (state = initialState, action) {
    switch (action.type) {
        case "SELECT_WINDOW":
            return action.payload.idWindow
        default:
            return state;
    }
}

export default selectedWindow;