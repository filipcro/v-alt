import axios from 'axios';

import store from '../store';
import { addItems } from './items';
import { SET_LAST_DATE } from '../constants/actionTypes';

const setLastDate = lastDate => ({
    lastDate,
    type: SET_LAST_DATE
});

export const fetchTransactions = firstDate => (dispatch) => {
    const { lastDate } = store.getState();
    let startdate;
    let enddate;

    if (lastDate) {
        enddate = lastDate;
    } else {
        enddate = new Date();
    }

    if (firstDate) {
        startdate = firstDate;
    } else {
        startdate = new Date(enddate);
        startdate.setMonth(startdate.getMonth() - 1);
    }

    if (startdate.getTime() > enddate.getTime()) {
        return;
    }

    axios.get('/transaction', { params: { startdate, enddate } })
        .then(({ data }) => {
            const parsedTransactions = data
                .transactions
                .map(transaction => ({
                    ...transaction,
                    dateTime: new Date(transaction.dateTime)
                }));
            dispatch(addItems({ transactions: parsedTransactions }));
            dispatch(setLastDate(startdate));
        });
};

export const addTransaction = () => {};
