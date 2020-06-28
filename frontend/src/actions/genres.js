import axios from 'axios'

import { baseUrl, getToken } from "../utils/constants"
import { setMessage, setOpen, setLoading } from "./index"

export const setAllGenres = (genres) => ({
    type: "SET_ALL_GENRES",
    payload: {
        genres
    }
})

export const getAllGenres = () => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.get(`${baseUrl}/genre/all`, {
            headers: {
                authorization: getToken()
            }
        })
        dispatch(setLoading(false))
        dispatch(setAllGenres(response.data))
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel acessar a lista de gêneros!", "red"))
        dispatch(setOpen(true))
    }
}

export const addGenre = (name) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.post(`${baseUrl}/genre/add`,
            { name },
            {
                headers: {
                    authorization: getToken()
                }
            })
        dispatch(setLoading(false))
        dispatch(setMessage(response?.data?.message, "green"))
        dispatch(setOpen(true))
        dispatch(getAllGenres())
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel aprovar o artista!", "red"))
        dispatch(setOpen(true))
    }
}

export const setGenreSelected = (genreId) => ({
    type: 'SET_GENRE_SELECTED',
    payload: {
        genreId
    }
})