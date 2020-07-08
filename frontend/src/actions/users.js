import axios from 'axios'
import { push } from 'connected-react-router'

import { routes, baseUrl, getToken } from "../utils/constants"
import { setMessage, setOpen, setLoading } from "./index"

export const signupListening = (signupData) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.post(`${baseUrl}/signup/listening`, signupData)
        await dispatch(setLoading(false))
        const token = response.data.accessToken
        const userRole = response.data.role
        const userName = response.data.name
        localStorage.setItem("token", token)
        localStorage.setItem("userRole", userRole)
        localStorage.setItem("userName", userName)
        dispatch(push(routes.home))
    } catch (err) {
        dispatch(setLoading(false))
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel criar cadastrar o usuário, tente novamente mais tarde !", "red"))
        dispatch(setOpen(true))
    }
}

export const signupBand = (signupData) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await axios.post(`${baseUrl}/signup/band`, signupData)
        await dispatch(setLoading(false))
        dispatch(setMessage("Artista cadastrado com sucesso! Aguarde aprovação do administrador para acessar a aplicação!", "green"))
        dispatch(setOpen(true))
    } catch (err) {
        dispatch(setLoading(false))
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel cadastrar o artista, tente novamente mais tarde!", "red"))
        dispatch(setOpen(true))
    }
}

export const signupAdministrator = (signupData) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await axios.post(`${baseUrl}/signup/administrator`,
            signupData,
            {
                headers: {
                    authorization: getToken()
                }
            })
        await dispatch(setLoading(false))
        dispatch(setMessage("Novo administrador cadastrado com sucesso!", "green"))
        dispatch(setOpen(true))
    } catch (err) {
        dispatch(setLoading(false))
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel cadastrar um novo administrador, tente novamente mais tarde!", "red"))
        dispatch(setOpen(true))
    }
}

export const login = loginData => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.post(`${baseUrl}/login`, loginData)
        const token = response.data.accessToken
        const userRole = response.data.role
        const userName = response.data.name
        localStorage.setItem("token", token)
        localStorage.setItem("userRole", userRole)
        localStorage.setItem("userName", userName)
        dispatch(setLoading(false))
        dispatch(push(routes.home))
    } catch (err) {
        console.error(err.response)
        dispatch(setLoading(false))
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel fazer o login, tente novamente mais tarde!", "red"))
        dispatch(setOpen(true))
    }
}

export const setAllBands = (bands) => ({
    type: "SET_ALL_BANDS",
    payload: {
        bands
    }
})


export const getAllBands = () => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.get(`${baseUrl}/bands`, {
            headers: {
                authorization: getToken()
            }
        })
        dispatch(setLoading(false))
        dispatch(setAllBands(response.data))
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel acessar a lista de artistas!", "red"))
        dispatch(setOpen(true))
    }

}

export const aproveBand = (id) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.post(`${baseUrl}/approve-band`,
            { id },
            {
                headers: {
                    authorization: getToken()
                }
            })
        dispatch(setLoading(false))
        dispatch(setMessage(response?.data?.message, "green"))
        dispatch(setOpen(true))
        dispatch(getAllBands())
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel aprovar o artista!", "red"))
        dispatch(setOpen(true))
    }

}

export const setAllUsers = (users) => ({
    type: "SET_ALL_USERS",
    payload: {
        users
    }
})


export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.get(`${baseUrl}/users`, {
            headers: {
                authorization: getToken()
            }
        })
        dispatch(setLoading(false))
        dispatch(setAllUsers(response.data))
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel acessar a lista de usuários!", "red"))
        dispatch(setOpen(true))
    }

}

export const blockUser = (id) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.post(`${baseUrl}/block-user`,
            { id: id },
            {
                headers: {
                    authorization: getToken()
                }
            })
        dispatch(setLoading(false))
        dispatch(setMessage(response?.data?.message, "green"))
        dispatch(setOpen(true))
        dispatch(getAllUsers())
        dispatch(getAllBands())
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel aprovar o artista!", "red"))
        dispatch(setOpen(true))
    }
}

export const setProfile = (user) => ({
    type: "SET_PROFILE",
    payload: {
        user
    }
})

export const getProfile = () => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.get(`${baseUrl}/profile`, {
            headers: {
                authorization: getToken()
            }
        })
        dispatch(setLoading(false))
        dispatch(setProfile(response?.data))
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel acessar os dados do usuário logado!", "red"))
        // dispatch(setOpen(true))
    }

}

export const changeName = (name) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.post(`${baseUrl}/change-name`,
            { name: name },
            {
                headers: {
                    authorization: getToken()
                }
            })
        dispatch(setLoading(false))
        dispatch(setMessage(response?.data?.message, "green"))
        dispatch(setOpen(true))
        dispatch(getProfile())
        localStorage.setItem("userName", name)
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err.response)
        // dispatch(setMessage(err?.response?.data?.message || "Não foi possivel alterar o nome do usuário!", "red"))
        // dispatch(setOpen(true))
    }
}

export const makePremium = (id) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await axios.post(`${baseUrl}/make-premium`,
            { id: id },
            {
                headers: {
                    authorization: getToken()
                }
            })
        dispatch(setLoading(false))
        dispatch(setMessage(response?.data?.message, "green"))
        dispatch(setOpen(true))
        dispatch(getAllUsers())
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel aprovar o artista!", "red"))
        dispatch(setOpen(true))
    }
}