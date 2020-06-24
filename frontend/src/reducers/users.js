const initialState = {
    allBands: [],
    allUsers: [],
    profile: {}
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

        case "SET_PROFILE":
            return {
                ...state,
                profile: action.payload.user
            }

        default:
            return state;
    }
}

export default users