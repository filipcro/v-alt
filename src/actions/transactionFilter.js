import {
    SET_START_DATE,
    SET_END_DATE,
    SWITCH_CHECK_ACCOUNT,
    SWITCH_CHECK_CATEGORY
} from '../constants/actionTypes';

export const setStartDate = startDate => ({
    type: SET_START_DATE,
    startDate
});

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
