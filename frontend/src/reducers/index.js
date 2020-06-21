import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import messages from "./messages"
import users from "./users"
import genres from "./genres"
import albuns from "./albuns"

export const generateReducers = history =>
    combineReducers({
        router: connectRouter(history),

        messages,
        users,
        genres,
        albuns
})