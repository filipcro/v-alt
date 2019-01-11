import axios from 'axios';

import {
    addItems,
    fetchItems,
    selectItem,
    unselectItem,
    removeItem
} from './items';

export const addAccount = (name, currency) => (dispatch) => {
    axios.post('/account', { name, currency })
        .then(({ data }) => dispatch(addItems(data)));
};

export const updateAccount = (id, name) => (dispatch) => {
    axios.put(`/account/${id}`, { name })
        .then(({ data }) => dispatch(addItems(data)));
};

export const removeAccount = id => (dispatch) => {
    axios.delete(`/account/${id}`)
        .then(({ data }) => {
            if (data.deleted) {
                dispatch(removeItem({ accounts: id }));
            }
        });
};

export const fetchAccounts = fetchItems('/account');

export const selectAccount = selectItem('account');

export const unselectAccount = unselectItem('account');
