const initialState = {
    myPlaylists: [],
    playlistSelected: {},
    playlistDetail: [],
    numPlaylistDetail: 0
}

const playlists = (state = initialState, action) => {

    switch (action.type) {
        case "SET_MY_PLAYLISTS":
            return {
                ...state,
                myPlaylists: action.payload.playlists
            }

        case "SET_PLAYLIST_ID_SELECTED":
            return {
                ...state,
                playlistSelected: action.payload.playlistId
            }

        case "SET_PLAYLIST_DETAIL":
            return {
                ...state,
                playlistDetail: action.payload.playlist
            }

        case "SET_COUNT_PLAYLIST_DETAIL":
            return {
                ...state,
                numPlaylistDetail: action.payload.num
            }

        default:
            return state;
    }
}

export default playlists