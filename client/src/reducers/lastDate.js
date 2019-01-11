import { SET_LAST_DATE } from '../constants/actionTypes';

const lastDateReducer = (state = null, action) => {
    if (action.type === SET_LAST_DATE) {
        return action.lastDate;
    }
    return state;
};

export default lastDateReducer;
