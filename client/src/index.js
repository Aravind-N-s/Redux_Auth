import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import { startAddUser } from './Redux/Action/userAction'
import configureStore from './Redux/Store/configureStore'

const store = configureStore()
if(localStorage.getItem('userAuthToken')){
  store.dispatch(startAddUser())
}

const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));