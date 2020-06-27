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

export const setSecretMessage = (option) => ({
    type: "SET_SECRET_MESSAGE",
    payload: {
        option
    }
})


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
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel acessar a lista de músicas!", "red"))
        dispatch(setOpen(true))
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
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel acessar a lista de músicas!", "red"))
        dispatch(setOpen(true))
    }

}


export const setInputSearch = (inputData) => ({
    type: 'SET_INPUT_SEARCH',
    payload: {
        inputData
    }
})


export const setGenreSelected = (genreId) => ({
    type: 'SET_GENRE_SELECTED',
    payload: {
        genreId
    }
})

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
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel acessar a lista de músicas!", "red"))
        dispatch(setOpen(true))
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
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel acessar a lista de músicas!", "red"))
        dispatch(setOpen(true))
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
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel acessar a lista de músicas!", "red"))
        dispatch(setOpen(true))
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
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel acessar a lista de músicas!", "red"))
        dispatch(setOpen(true))
    }
}

export const setLoading = (option) => ({
    type: 'SET_LOADING',
    payload: {
        option
    }
})


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
        console.error(err.response)
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
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel alterar o nome da música!", "red"))
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
        // dispatch(getMyPlaylists())
    }
    catch (err) {
        dispatch(setLoading(false))
        console.error(err.response)
        dispatch(setMessage(err?.response?.data?.message || "Não foi possivel criar a música!", "red"))
        dispatch(setOpen(true))
    }
}
