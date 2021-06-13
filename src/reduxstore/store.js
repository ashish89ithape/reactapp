import { createStore, combineReducers, applyMiddleware } from 'redux'
import Authreducer from './Authreducer'
import CartReducer from './CartReducer'
import thunk from 'redux-thunk';

let middle = store => next => action => {

    next(action)
}
var reducers = combineReducers({ Authreducer, CartReducer })
let store    = createStore(reducers, applyMiddleware(middle, thunk))

export default store
