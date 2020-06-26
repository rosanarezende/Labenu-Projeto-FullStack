const initialState = {
    open: false,
    text: "",
    color: "",

    secreteMessage: false
}

const messages = (state = initialState, action) => {

    switch (action.type) {
        case "SET_OPEN":
            return {
                ...state,
                open: action.payload.option
            }

        case "SET_MESSAGE":
            return {
                ...state,
                text: action.payload.text,
                color: action.payload.color
            }

        case "SET_SECRET_MESSAGE":
            return {
                ...state,
                secreteMessage: action.payload.option
            }

        default:
            return state;
    }
}

export default messages