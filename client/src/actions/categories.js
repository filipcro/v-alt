import axios from 'axios';

import {
    fetchItems,
    addItems,
    removeItem,
    selectItem,
    unselectItem
} from './items';

export const fetchCategories = fetchItems('/category');

export const addCategory = (name, incomings, outgoings, icon) => (dispatch) => {
    axios.post('/category', {
        name,
        incomings,
        outgoings,
        icon
    }).then(({ data }) => dispatch(addItems(data)));
};

export const updateCategory = (id, name, incomings, outgoings, icon) => (dispatch) => {
    axios.put(`/category/${id}`, {
        name, incomings, outgoings, icon
    }).then(({ data }) => dispatch(addItems(data)));
};

export const removeCategory = id => (dispatch) => {
    axios.delete(`/category/${id}`)
        .then(({ data }) => {
            if (data.deleted) {
                dispatch(removeItem({ categories: id }));
            }
        });
};

export const selectCategory = selectItem('category');

export const unselectCategory = unselectItem('category');
