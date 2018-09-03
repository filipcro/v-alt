import axios from 'axios';

import { fetchItems, addItems } from './items';

export const fetchCategories = fetchItems('/category');

export const addCategory = (name, incomings, outgoings, icon) => (dispatch) => {
    axios.post('/category', {
        name,
        incomings,
        outgoings,
        icon
    }).then(({ data }) => dispatch(addItems(data)));
};
