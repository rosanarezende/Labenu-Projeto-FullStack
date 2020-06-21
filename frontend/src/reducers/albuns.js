const initialState = {
    bandAlbuns: [],
}

const albuns = (state = initialState, action) => {

    switch (action.type) {
        case "SET_BAND_ALBUNS":
            return {
                ...state,
                bandAlbuns: action.payload.albuns
            }

        default:
            return state;
    }
}

export default albuns