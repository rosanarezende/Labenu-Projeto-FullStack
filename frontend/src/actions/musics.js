import axios from 'axios'

import { baseUrl, getToken } from "../utils/constants"
import { setMessage, setOpen, setLoading } from "./index"

export const createMusic = (info) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.post(`${baseUrl}/music/create`,
            info,
            {
                headers: {
                    authorization: getToken()
                }
            })
        dispatch(setLoading(false))
        dispatch(setMessage(response?.data?.message, "green"))
        dispatch(setOpen(true))
        dispatch(getMyMusics())
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel criar a música!", "red"))
        dispatch(setOpen(true))
    }
}

export const setAllMusics = (musics) => ({
    type: "SET_ALL_MUSICS",
    payload: {
        musics
    }
})

export const getAllMusics = () => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.get(`${baseUrl}/music/all`)
        dispatch(setLoading(false))
        dispatch(setAllMusics(response.data))
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err?.response?.data?.message)
    }
}

export const setMyMusics = (musics) => ({
    type: "SET_MY_MUSICS",
    payload: {
        musics
    }
})

export const getMyMusics = () => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.get(`${baseUrl}/music/my`,
            {
                headers: {
                    authorization: getToken()
                }
            })
        dispatch(setLoading(false))
        dispatch(setMyMusics(response.data))
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err?.response?.data?.message)
    }
}

export const setMusicIdSelected = (musicId) => ({
    type: 'SET_MUSIC_ID_SELECTED',
    payload: {
        musicId
    }
})

export const setMusicsList = (musics) => ({
    type: "SET_MUSICS_LIST",
    payload: {
        musics
    }
})

export const getMusicsList = (page = 1) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.get(`${baseUrl}/music/list/${page}`)
        dispatch(setLoading(false))
        dispatch(setMusicsList(response.data))
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err?.response?.data?.message)
    }
}

export const setCountMusicsList = (num) => ({
    type: "SET_COUNT_MUSICS_LIST",
    payload: {
        num
    }
})

export const getCountMusicsList = () => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.get(`${baseUrl}/music/count/all`)
        dispatch(setLoading(false))
        dispatch(setCountMusicsList(response.data.count))
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err?.response?.data?.message)
    }

}

export const setMusicsByGenre = (musics) => ({
    type: "SET_MUSICS_BY_GENRE",
    payload: {
        musics
    }
})

export const getMusicsByGenre = (genreId = "nope", page = 1) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.get(`${baseUrl}/music/${genreId}/${page}`)
        dispatch(setLoading(false))
        dispatch(setMusicsByGenre(response.data))
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err?.response?.data?.message)
    }
}

export const setCountMusicsByGenre = (num) => ({
    type: "SET_COUNT_MUSICS_BY_GENRE",
    payload: {
        num
    }
})

export const getCountMusicsByGenre = (genreId = "nope") => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.get(`${baseUrl}/music/count/${genreId}`)
        dispatch(setLoading(false))
        dispatch(setCountMusicsByGenre(response.data.count))
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err?.response?.data?.message)
    }
}

export const deleteMusic = (id) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.delete(`${baseUrl}/music/delete/${id}`,
            {
                headers: {
                    authorization: getToken()
                }
            })
        dispatch(setLoading(false))
        dispatch(setMessage(response?.data?.message, "green"))
        dispatch(setOpen(true))
        dispatch(getMyMusics())
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err?.response?.data?.message)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel aprovar o artista!", "red"))
        dispatch(setOpen(true))
    }
}

export const editMusicName = (info) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.post(`${baseUrl}/music/edit-name`,
            info,
            {
                headers: {
                    authorization: getToken()
                }
            })
        dispatch(setLoading(false))
        dispatch(setMessage(response?.data?.message, "green"))
        dispatch(setOpen(true))
        dispatch(getMyMusics())
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err?.response?.data?.message)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel alterar o nome da música!", "red"))
        dispatch(setOpen(true))
    }
}
