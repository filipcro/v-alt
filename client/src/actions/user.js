import axios from 'axios';
import { LOG_IN, LOG_OUT, INVALID_CREDENTIALS } from '../constants/actionTypes';
import { removeToken, setToken } from '../auth';

import fetchCurrencies from './currencies';
import fetchIcons from './icons';
import { fetchCategories } from './categories';
import { fetchAccounts } from './accounts';
import { fetchTransactions } from './transactions';

export const setUser = (user, token) => {
    if (token) {
        setToken(token);
    }

    return {
        user,
        type: LOG_IN
    };
};

export const logOut = () => {
    removeToken();
    return {
        type: LOG_OUT
    };
};

export const invalidCredentials = () => ({
    type: INVALID_CREDENTIALS
});

export const fetchUser = () => (dispatch) => {
    axios.get('/user')
        .then(({ data }) => {
            dispatch(setUser(data.user));
        }, (error) => {
            if (error.response.status === 401) {
                dispatch(logOut());
            }
        }).then(() => Promise.all([
            dispatch(fetchIcons()),
            dispatch(fetchCurrencies())
        ])).then(() => Promise.all([
            dispatch(fetchCategories()),
            dispatch(fetchAccounts())
        ]))
        .then(() => dispatch(fetchTransactions()));
};

export const logIn = (username, password) => (dispatch) => {
    axios.post('/user/login', { username, password })
        .then(({ data }) => {
            dispatch(setUser(data.user, data.token));
        }, (error) => {
            if (error.response.status === 401) {
                dispatch(logOut());
                dispatch(invalidCredentials());
            }
        }).then(() => Promise.all([
            dispatch(fetchIcons()),
            dispatch(fetchCurrencies())
        ])).then(() => Promise.all([
            dispatch(fetchCategories()),
            dispatch(fetchAccounts())
        ]))
        .then(() => dispatch(fetchTransactions()));
};

export const signUp = (username, password, email, name) => (dispatch) => {
    axios.post('/user', {
        username,
        password,
        email,
        name
    }).then(({ data }) => {
        dispatch(setUser(data.user, data.token));
    });
};
