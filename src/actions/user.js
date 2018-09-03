import axios from 'axios';
import { SET_USER, LOG_OUT } from '../constants/actionTypes';
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
        type: SET_USER
    };
};

export const logOut = () => {
    removeToken();
    return {
        type: LOG_OUT
    };
};

export const fetchUser = () => (dispatch) => {
    axios.get('/user')
        .then(({ data }) => {
            dispatch(setUser(data.user));

            dispatch(fetchIcons());
            dispatch(fetchCurrencies());
            dispatch(fetchAccounts());
            dispatch(fetchCategories());
            dispatch(fetchTransactions());
        }, (error) => {
            if (error.status === 401) {
                dispatch(logOut());
            }
        });
};

export const logIn = (username, password) => (dispatch) => {
    axios.post('/user/login', { username, password })
        .then(({ data }) => {
            dispatch(setUser(data.user, data.token));
        });
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
