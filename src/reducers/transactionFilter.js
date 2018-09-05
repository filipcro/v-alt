import moment from 'moment';

import {
    SET_START_DATE,
    SET_END_DATE,
    SWITCH_CHECK_ACCOUNT,
    SWITCH_CHECK_CATEGORY
} from '../constants/actionTypes';

const transactionFilter = (state, action) => {
    if (state === undefined) {
        return {
            endDate: moment(),
            startDate: moment().subtract(1, 'months'),
            checkedAccounts: {},
            checkedCategories: {}
        };
    }

    if (action.type === SET_START_DATE) {
        return {
            ...state,
            startDate: action.startDate
        };
    }

    if (action.type === SET_END_DATE) {
        return {
            ...state,
            endDate: action.endDate
        };
    }

    if (action.type === SWITCH_CHECK_ACCOUNT) {
        const checkedAccounts = {
            ...state.checkedAccounts,
            [action.account]: !(state.checkedAccounts[action.account])
        };
        return { ...state, checkedAccounts };
    }

    if (action.type === SWITCH_CHECK_CATEGORY) {
        const checkedCategories = {
            ...state.checkedCategories,
            [action.category]: !(state.checkedCategories[action.category])
        };
        return { ...state, checkedCategories };
    }

    return state;
};

export default transactionFilter;
