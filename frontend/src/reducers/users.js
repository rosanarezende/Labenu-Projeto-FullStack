const initialState = {
    allBands: [],
    allUsers: [],
}

const users = (state = initialState, action) => {

    switch (action.type) {
        case "SET_ALL_BANDS":
            return {
                ...state,
                allBands: action.payload.bands
            }

        case "SET_ALL_USERS":
            return {
                ...state,
                allUsers: action.payload.users
            }

        default:
            return state;
    }
}

export default users