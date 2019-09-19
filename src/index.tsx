import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as Redux from 'redux';
import { Provider } from 'react-redux';
import { messagesReducer, addressReducer } from './stores/messagesStore';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

const rootReducer = Redux.combineReducers({ messagesReducer, addressReducer });
const store = Redux.createStore(rootReducer, Redux.applyMiddleware(thunkMiddleware, logger));
export type AppState = ReturnType<typeof rootReducer>;

const rootElement = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(rootElement, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
