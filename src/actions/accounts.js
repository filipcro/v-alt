import axios from 'axios';

import {
    addItems,
    fetchItems,
    selectItem,
    unselectItem
} from './items';

export const addAccount = (name, currency) => (dispatch) => {
    axios.post('/account', { name, currency })
        .then(({ data }) => dispatch(addItems(data)));
};

export const fetchAccounts = fetchItems('/account');

export const selectAccount = selectItem('account');

export const unselectAccount = unselectItem('account');
