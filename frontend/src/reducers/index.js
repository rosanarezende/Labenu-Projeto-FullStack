import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import messages from "./messages"
import users from "./users"
import genres from "./genres"

export const generateReducers = history =>
    combineReducers({
        router: connectRouter(history),

        messages,
        users,
        genres
})