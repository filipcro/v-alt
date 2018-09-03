import { SET_USER, LOG_OUT } from '../constants/actionTypes';

const user = (state = null, action) => {
    switch (action.type) {
        case SET_USER:
            return action.user;
        case LOG_OUT:
            return null;
        default:
            return state;
    }
};

export default user;
