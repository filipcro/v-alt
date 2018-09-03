import { ADD_ITEMS } from '../constants/actionTypes';

const curreciesReducer = itemName => (state = {}, action) => {
    if (action.type === ADD_ITEMS && action.items[itemName]) {
        const items = action.items[itemName];
        const itemsObject = Object.assign({}, state, ...items.map(item => ({ [item.id]: item })));
        return itemsObject;
    }
    return state;
};

export default curreciesReducer;
