import userStatus from '../constants/userStatus';
import { LOG_IN, LOG_OUT, INVALID_CREDENTIALS } from '../constants/actionTypes';

const userStatusReducer = (state = userStatus.UNAUTHENTICATED, action) => {
    switch (action.type) {
        case LOG_IN:
            return userStatus.LOGGED_IN;
        case LOG_OUT:
            return userStatus.UNAUTHENTICATED;
        case INVALID_CREDENTIALS:
            return userStatus.INVALID_CREDENTIALS;
        default:
            return state;
    }
}

export default userStatusReducer;