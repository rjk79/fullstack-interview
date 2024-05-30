import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/root';

import configureStore from './store/store';

// We will use this to parse the user's session token
import jwt_decode from 'jwt-decode';

import { setAuthToken } from './util/session_api_util';

import { logout } from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
    let store;

    // returning user
    if (localStorage.jwtToken) {

        // set token as common header for axios requests
        setAuthToken(localStorage.jwtToken);

        // decode token 
        const decodedUser = jwt_decode(localStorage.jwtToken);

        const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };

        store = configureStore(preloadedState);

        const currentTime = Date.now() / 1000;

        // If the user's token has expired
        if (decodedUser.exp < currentTime) {
            // Logout the user 
            store.dispatch(logout());
            window.location.href = '/#/login';
        }
    } else {
        // If this is a first time user, start with an empty store
        store = configureStore({});
    }
    
    window.getState = store.getState

    const root = document.getElementById('root');

    ReactDOM.render(<Root store={store} />, root);
});