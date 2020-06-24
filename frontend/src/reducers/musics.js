const initialState = {
    allMusics: [],
    musicIdSelected: "",
    musicsList: [],
    musicsByGenre: [],
    numMusicsList: 0,
    numMusicsByGenre: 0,
    myMusics: []
}

const musics = (state = initialState, action) => {

    switch (action.type) {
        case "SET_ALL_MUSICS":
            return {
                ...state,
                allMusics: action.payload.musics
            }

        case "SET_MUSIC_ID_SELECTED":
            return {
                ...state,
                musicIdSelected: action.payload.musicId
            }

        case "SET_MUSICS_LIST":
            return {
                ...state,
                musicsList: action.payload.musics
            }

        case "SET_MUSICS_BY_GENRE":
            return {
                ...state,
                musicsByGenre: action.payload.musics
            }

        case "SET_COUNT_MUSICS_LIST":
            return {
                ...state,
                numMusicsList: action.payload.num
            }

        case "SET_COUNT_MUSICS_BY_GENRE":
            return {
                ...state,
                numMusicsByGenre: action.payload.num
            }

        case "SET_MY_MUSICS":
            return {
                ...state,
                myMusics: action.payload.musics
            }

        default:
            return state;
    }
}

export default musics