import { SELECT_ITEM, UNSELECT_ITEM } from '../constants/actionTypes';

const selectedItemReducerCreator = itemName => (state = null, action) => {
    if (action.type === SELECT_ITEM && action.subtype === itemName) {
        return action.id;
    }
    if (action.type === UNSELECT_ITEM && action.subtype === itemName) {
        return null;
    }
    return state;
};

export default selectedItemReducerCreator;
