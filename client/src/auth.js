import axios from 'axios';

const TOKEN = 'auth_token';

const setAxiosToken = (token) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const initAuth = () => {
    const token = window.localStorage.getItem(TOKEN);

    if (token) {
        setAxiosToken(token);
    }
};

initAuth();

export const setToken = (token) => {
    window.localStorage.setItem(TOKEN, token);
    setAxiosToken(token);
};

export const removeToken = () => {
    window.localStorage.removeItem(TOKEN);
    setAxiosToken('');
};
