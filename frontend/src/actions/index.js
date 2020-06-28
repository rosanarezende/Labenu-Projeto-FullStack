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

export const setInputSearch = (inputData) => ({
    type: 'SET_INPUT_SEARCH',
    payload: {
        inputData
    }
})

export const setLoading = (option) => ({
    type: 'SET_LOADING',
    payload: {
        option
    }
})
