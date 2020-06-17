import axios from 'axios'

const baseUrl = ""
const getToken = () => localStorage.getItem("token")

const setLoggedUser = (user) => ({
    type: "SET_LOGGED_USER",
    payload: {
        user
    }
})

export const getLoggedUser = () => async (dispatch) => {
    try{
        const response = await axios.get(`${baseUrl}`, { // ver /alguma coisa
            headers: {
                auth: getToken()
            }
        })
        dispatch(setLoggedUser(response.data)) // ver .data.algumaCoisa

    }
    catch(err) {
        console.error(err.message)
        alert("Não foi possível encontrar o usuário")
        // dá um dispatch pro login???
    }
}