const initialState = {
    allBands: [],
}

const users = (state = initialState, action) => {

    switch (action.type) {
        case "SET_ALL_BANDS":
            return {
                ...state,
                allBands: action.payload.bands
            }

        default:
            return state;
    }
}

export default users