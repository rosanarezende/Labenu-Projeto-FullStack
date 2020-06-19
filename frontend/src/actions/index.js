import axios from 'axios'
import { push } from 'connected-react-router'
import { routes, baseUrl, getToken } from "../utils/constants"

export const setOpen = (option) => ({
    type: "SET_OPEN",
    payload: {
        option
    }
})

export const setMessage = (text, color) => ({
    type: "SET_MESSAGE",
    payload: {
        text,
        color
    }
})

export const signupListening = (signupData) => async (dispatch) => {
    try {
        const response = await axios.post(`${baseUrl}/signup/listening`, signupData)
        const token = response.data.accessToken
        const userRole = response.data.role
        const userName = response.data.name
        localStorage.setItem("token", token)
        localStorage.setItem("userRole", userRole)
        localStorage.setItem("userName", userName)
        dispatch(push(routes.home))
    } catch (err) {
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel criar cadastrar o usuário, tente novamente mais tarde !", "red"))
        dispatch(setOpen(true))
    }
}

export const signupBand = (signupData) => async (dispatch) => {
    try {
        await axios.post(`${baseUrl}/signup/band`, signupData)
        dispatch(setMessage("Artista cadastrado com sucesso! Aguarde aprovação do administrador para acessar a aplicação!", "green"))
        dispatch(setOpen(true))
    } catch (err) {
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel cadastrar o artista, tente novamente mais tarde!", "red"))
        dispatch(setOpen(true))
    }
}

export const signupAdministrator = (signupData) => async (dispatch) => {
    console.log("chegou", signupData)
    try {
        await axios.post(`${baseUrl}/signup/administrator`,
            signupData,
            {
                headers: {
                    authorization: getToken()
                }
            })
        dispatch(setMessage("Novo administrador cadastrado com sucesso!", "green"))
        dispatch(setOpen(true))
    } catch (err) {
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel cadastrar um novo administrador, tente novamente mais tarde!", "red"))
        dispatch(setOpen(true))
    }
}

export const login = loginData => async (dispatch) => {
    try {
        const response = await axios.post(`${baseUrl}/login`, loginData)
        const token = response.data.accessToken
        const userRole = response.data.role
        const userName = response.data.name
        localStorage.setItem("token", token)
        localStorage.setItem("userRole", userRole)
        localStorage.setItem("userName", userName)
        dispatch(push(routes.home))
    } catch (err) {
        console.error(err.response)
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
        const response = await axios.get(`${baseUrl}/bands`, {
            headers: {
                authorization: getToken()
            }
        })
        dispatch(setAllBands(response.data))
    }
    catch (err) {
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel acessar a lista de artistas!", "red"))
        dispatch(setOpen(true))
    }

}

export const aproveBand = (id) => async (dispatch) => {
    try {
        const response = await axios.post(`${baseUrl}/approve-band`,
            { id: id },
            {
                headers: {
                    authorization: getToken()
                }
            })
        dispatch(setMessage(response?.data?.message, "green"))
        dispatch(setOpen(true))
    }
    catch (err) {
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel aprovar o artista!", "red"))
        dispatch(setOpen(true))
    }

}



export const setAllGenres = (genres) => ({
    type: "SET_ALL_GENRES",
    payload: {
        genres
    }
})

export const getAllGenres = () => async (dispatch) => {
    try {
        const response = await axios.get(`${baseUrl}/genre/all`, {
            headers: {
                authorization: getToken()
            }
        })
        dispatch(setAllGenres(response.data))
    }
    catch (err) {
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel acessar a lista de gêneros!", "red"))
        dispatch(setOpen(true))
    }

}



// const setLoggedUser = (user) => ({
//     type: "SET_LOGGED_USER",
//     payload: {
//         user
//     }
// })

// export const getLoggedUser = () => async (dispatch) => {
//     // preciso enviar o token? acho que sim... pelo headers
//     try{
//         const response = await axios.get(`${baseUrl}/profile`, { // ver /alguma coisa
//             headers: {
//                 authorization: getToken()
//             }
//         })
//         dispatch(setLoggedUser(response.data)) // ver .data.algumaCoisa

//     }
//     catch(err) {
//         console.error(err.message)
//         alert("Não foi possível encontrar o usuário")
//         // dá um dispatch pro login???
//     }
// }