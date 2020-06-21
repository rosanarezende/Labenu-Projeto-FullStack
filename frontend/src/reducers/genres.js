const initialState = {
    allGenres: [],
}

const genres = (state = initialState, action) => {

    switch (action.type) {
        case "SET_ALL_GENRES":
            return {
                ...state,
                allGenres: action.payload.genres
            }

        default:
            return state;
    }
}

export default genres