import axios from 'axios'

import { baseUrl, getToken } from "../utils/constants"
import { setMessage, setOpen, setLoading } from "./index"
import { getMyMusics } from "./musics"

export const createAlbum = (info) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.post(`${baseUrl}/album/create`,
            info,
            {
                headers: {
                    authorization: getToken()
                }
            })
        dispatch(setLoading(false))
        dispatch(setMessage(response?.data?.message, "green"))
        dispatch(setOpen(true))
        dispatch(getBandAlbuns())
    }
    catch (err) {
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel criar o álbum!", "red"))
        dispatch(setOpen(true))
    }
}

export const setBandAlbuns = (albuns) => ({
    type: "SET_BAND_ALBUNS",
    payload: {
        albuns
    }
})

export const getBandAlbuns = () => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.get(`${baseUrl}/album/band`,
            {
                headers: {
                    authorization: getToken()
                }
            })
        dispatch(setLoading(false))
        dispatch(setBandAlbuns(response.data))
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel criar a música!", "red"))
        dispatch(setOpen(true))
    }
}

export const deleteAlbum = (id) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.delete(`${baseUrl}/album/delete/${id}`,
            {
                headers: {
                    authorization: getToken()
                }
            })
        dispatch(setLoading(false))
        dispatch(setMessage(response?.data?.message, "green"))
        dispatch(setOpen(true))
        dispatch(getBandAlbuns())
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel aprovar o artista!", "red"))
        dispatch(setOpen(true))
    }
}

export const editAlbumName = (info) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.post(`${baseUrl}/album/edit-name`,
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
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel alterar o nome do álbum!", "red"))
        dispatch(setOpen(true))
    }
}

export const changeAlbum = (info) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.post(`${baseUrl}/music/change-album`,
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
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel alterar o álbum!", "red"))
        dispatch(setOpen(true))
    }
}
