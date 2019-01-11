import axios from 'axios';

import {
    ADD_ITEMS,
    SELECT_ITEM,
    UNSELECT_ITEM,
    REMOVE_ITEM
} from '../constants/actionTypes';

export const addItems = items => ({
    items,
    type: ADD_ITEMS
});

export const removeItem = item => ({
    item,
    type: REMOVE_ITEM
});

export const fetchItems = url => () => dispatch => axios.get(url)
    .then(({ data }) => {
        dispatch(addItems(data));
    });


export const selectItem = subtype => id => ({
    subtype,
    id,
    type: SELECT_ITEM
});

export const unselectItem = subtype => () => ({
    subtype,
    type: UNSELECT_ITEM
});
