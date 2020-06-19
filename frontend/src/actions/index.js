import axios from 'axios'
import { push } from 'connected-react-router'
import { routes, baseUrl, getToken } from "../utils/constants"

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
    } catch (error) {
        console.error(error.message)
        alert("Não foi possivel criar o cadastro, tente novamente mais tarde !")
    }
}

export const signupBand = (signupData) => async (dispatch) => {
    try {
        await axios.post(`${baseUrl}/signup/band`, signupData)
    } catch (error) {
        console.error(error.message)
        alert("Não foi possivel criar o cadastro, tente novamente mais tarde !")
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
    } catch (error) {
        console.error(error.message)
        alert("Não foi possivel criar o cadastro, tente novamente mais tarde !")
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
        console.error(err.message)
        // alert(err.message)
        // alert("Não foi possivel fazer o login, tente novamente mais tarde!")
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