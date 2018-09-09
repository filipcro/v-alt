import { combineReducers } from 'redux';

import user from './user';
import lastDate from './lastDate';
import items from './items';
import selectedItem from './selectedItem';
import userStatus from './userStatus';
import transactionFilter from './transactionFilter';

const rootReducer = combineReducers({
    user,
    lastDate,
    userStatus,
    transactionFilter,
    transactions: items('transactions'),
    currencies: items('currencies'),
    icons: items('icons'),
    accounts: items('accounts'),
    categories: items('categories'),
    accountSums: items('accountSums'),
    selectedAccount: selectedItem('account'),
    selectedCategory: selectedItem('category'),
    selectedTransaction: selectedItem('transaction')
});

export default rootReducer;
