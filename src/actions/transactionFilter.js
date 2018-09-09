import {
    SET_START_DATE,
    SET_END_DATE,
    SWITCH_CHECK_ACCOUNT,
    SWITCH_CHECK_CATEGORY
} from '../constants/actionTypes';
import { fetchTransactions } from './transactions';
import store from '../store';

export const setStartDate = startDate => (dispatch) => {
    if (startDate < store.getState().lastDate) {
        dispatch(fetchTransactions(startDate));
    }

    dispatch({
        type: SET_START_DATE,
        startDate
    });
};

export const setEndDate = endDate => ({
    type: SET_END_DATE,
    endDate
});

export const switchCheckedAccount = accountId => ({
    type: SWITCH_CHECK_ACCOUNT,
    account: accountId
});

export const switchCheckedCategory = categoryId => ({
    type: SWITCH_CHECK_CATEGORY,
    category: categoryId
});
