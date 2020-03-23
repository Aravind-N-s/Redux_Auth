import {createStore, combineReducers, applyMiddleware} from 'redux'
// import thunk from 'redux-thunk'
import saga from 'redux-saga'
import userReducer from '../views/Login/redux/reducer'
const configureStore = () => {
    const store = createStore(combineReducers({
        user: userReducer
    }),applyMiddleware(saga))
    return store
}
export default configureStore