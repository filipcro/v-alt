import axios from 'axios';
import moment from 'moment';

import store from '../store';

import {
    addItems,
    removeItem,
    selectItem,
    unselectItem
} from './items';

import { SET_LAST_DATE } from '../constants/actionTypes';

const setLastDate = lastDate => ({
    lastDate,
    type: SET_LAST_DATE
});

const addTransactionAsItem = (data) => {
    const transactions = data
        .transactions
        .map(transaction => ({
            ...transaction,
            dateTime: moment(transaction.dateTime)
        }));

    return addItems({ transactions });
};

export const fetchTransactions = firstDate => (dispatch) => {
    const { lastDate } = store.getState();
    let startdate;
    let enddate;

    if (lastDate) {
        enddate = lastDate;
    } else {
        enddate = moment();
    }

    if (firstDate) {
        startdate = firstDate;
    } else {
        startdate = moment(enddate).subtract(1, 'months');
    }

    if (startdate > enddate) {
        return;
    }

    axios.get('/transaction', {
        params: {
            startdate: startdate.toISOString(),
            enddate: enddate.toISOString()
        }
    }).then(({ data }) => {
        dispatch(addTransactionAsItem(data));
        dispatch(addItems({ accountSums: data.accountSums }));
        dispatch(setLastDate(startdate));
    });
};

export const addTransaction = transaction => (dispatch) => {
    axios.post('/transaction', {
        ...transaction,
        dateTime: transaction.dateTime.toISOString()
    }).then(({ data }) => dispatch(addTransactionAsItem(data)));
};

export const updateTransaction = (id, transaction) => (dispatch) => {
    axios.put(`/transaction/${id}`, {
        ...transaction,
        dateTime: transaction.dateTime.toISOString()
    }).then(({ data }) => dispatch(addTransactionAsItem(data)));
};

export const removeTransaction = id => (dispatch) => {
    axios.delete(`/transaction/${id}`)
        .then(({ data }) => {
            if (data.deleted) {
                dispatch(removeItem({ transactions: id }));
            }
        });
};

export const selectTransaction = selectItem('transaction');

export const unselectTransaction = unselectItem('transaction');
