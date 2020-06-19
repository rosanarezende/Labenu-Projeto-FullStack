import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import messages from "./messages"

export const generateReducers = history =>
    combineReducers({
        router: connectRouter(history),

        messages
})