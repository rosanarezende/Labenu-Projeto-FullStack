const initialState = {
    inputSearch: undefined,
    selectedGenre: undefined
}

const search = (state = initialState, action) => {

    switch (action.type) {
        case "SET_INPUT_SEARCH":
            return {
                ...state,
                inputSearch: action.payload.inputData
            }

        case "SET_GENRE_SELECTED":
            return {
                ...state,
                selectedGenre: action.payload.genreId
            }

        default:
            return state;
    }
}

export default search