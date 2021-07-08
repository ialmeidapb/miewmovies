import {createStore} from 'redux'
import combineReducers from './combineReducers'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export default createStore(combineReducers)