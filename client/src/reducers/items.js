import { ADD_ITEMS, REMOVE_ITEM } from '../constants/actionTypes';

const curreciesReducer = itemName => (state = {}, action) => {
    if (action.type === ADD_ITEMS && action.items[itemName]) {
        const items = action.items[itemName];
        const itemsObject = Object.assign({}, state, ...items.map(item => ({ [item.id]: item })));
        return itemsObject;
    }
    if (action.type === REMOVE_ITEM && action.item[itemName]) {
        const itemId = action.item[itemName];
        const { [itemId]: _, ...newState } = state;
        return newState;
    }
    return state;
};

export default curreciesReducer;
