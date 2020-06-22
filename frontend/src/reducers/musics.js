const initialState = {
    allMusics: [],
}

const musics = (state = initialState, action) => {

    switch (action.type) {
        case "SET_ALL_MUSICS":
            return {
                ...state,
                allMusics: action.payload.musics
            }

        default:
            return state;
    }
}

export default musics