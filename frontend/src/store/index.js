import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

import { generateReducers } from '../reducers'

export const history = createBrowserHistory()

const middlewares = [
    applyMiddleware(routerMiddleware(history), thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
];

export const store = createStore(
    generateReducers(history),
    compose(...middlewares)
);
