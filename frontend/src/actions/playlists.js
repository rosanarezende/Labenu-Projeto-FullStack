import axios from 'axios'
import { baseUrl, getToken } from "../utils/constants"
import { setMessage, setOpen, setSecretMessage, setLoading } from "./index"

export const createPlaylist = (name) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.post(`${baseUrl}/playlist/create`,
            { name },
            {
                headers: {
                    authorization: getToken()
                }
            })
        dispatch(setLoading(false))
        dispatch(setMessage(response?.data?.message, "green"))
        dispatch(setOpen(true))
        dispatch(setSecretMessage(true))
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel criar a música!", "red"))
        dispatch(setOpen(true))
    }
}

export const setMyPlaylists = (playlists) => ({
    type: "SET_MY_PLAYLISTS",
    payload: {
        playlists
    }
})

export const getMyPlaylists = () => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.get(`${baseUrl}/playlist/my`, {
            headers: {
                authorization: getToken()
            }
        })
        dispatch(setLoading(false))
        dispatch(setMyPlaylists(response.data))
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err.response)
    }
}

export const addMusicToPlaylist = (info) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.post(`${baseUrl}/playlist/add-music`,
            info,
            {
                headers: {
                    authorization: getToken()
                }
            })
        dispatch(setLoading(false))
        dispatch(setMessage(response?.data?.message, "green"))
        dispatch(setOpen(true))
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err.response)
    }
}

export const removeMusicFromPlaylist = (info) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.delete(`${baseUrl}/playlist/remove-music`,
            {
                headers: {
                    authorization: getToken()
                },
                data: info
            })
        dispatch(setLoading(false))
        dispatch(setMessage(response?.data?.message, "green"))
        dispatch(setOpen(true))
        dispatch(getPlaylistDetail(info?.playlistId))
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel aprovar o artista!", "red"))
        dispatch(setOpen(true))
    }
}

export const deletePlaylist = (id) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.delete(`${baseUrl}/playlist/delete/${id}`,
            {
                headers: {
                    authorization: getToken()
                }
            })
        dispatch(setLoading(false))
        dispatch(setMessage(response?.data?.message, "green"))
        dispatch(setOpen(true))
        dispatch(getMyPlaylists())
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel aprovar o artista!", "red"))
        dispatch(setOpen(true))
    }
}

export const setPlaylistIdSelected = (playlistId) => ({
    type: 'SET_PLAYLIST_ID_SELECTED',
    payload: {
        playlistId
    }
})

export const setPlaylistDetail = (playlist) => ({
    type: "SET_PLAYLIST_DETAIL",
    payload: {
        playlist
    }
})

export const getPlaylistDetail = (id, page = 1) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.get(`${baseUrl}/playlist/detail/${id}/${page}`, {
            headers: {
                authorization: getToken()
            }
        })
        dispatch(setLoading(false))
        dispatch(setPlaylistDetail(response.data))
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err.response)
    }
}

export const setCountPlaylistDetail = (num) => ({
    type: "SET_COUNT_PLAYLIST_DETAIL",
    payload: {
        num
    }
})

export const getCountPlaylistDetail = (playlistId) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.get(`${baseUrl}/playlist/count/${playlistId}`)
        dispatch(setLoading(false))
        dispatch(setCountPlaylistDetail(response.data.count))
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel acessar a lista de músicas!", "red"))
        dispatch(setOpen(true))
    }
}

export const makeCollaborative = (info) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.post(`${baseUrl}/playlist/collaborative`,
            info,
            {
                headers: {
                    authorization: getToken()
                }
            })
        dispatch(setLoading(false))
        dispatch(setMessage(response?.data?.message, "green"))
        dispatch(setOpen(true))
        dispatch(getMyPlaylists())
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel adicionar a música a playlist!", "red"))
        dispatch(setOpen(true))
    }
}


export const editPlaylistName = (info) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.post(`${baseUrl}/playlist/edit-name`,
            info,
            {
                headers: {
                    authorization: getToken()
                }
            })
        dispatch(setLoading(false))
        dispatch(setMessage(response?.data?.message, "green"))
        dispatch(setOpen(true))
        dispatch(getPlaylistDetail(info.playlistId)) // não tá atualizando o nome
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel adicionar a música a playlist!", "red"))
        dispatch(setOpen(true))
    }
}

