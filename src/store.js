import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import user from './reducers/user';
import lastDate from './reducers/lastDate';
import items from './reducers/items';
import selectedItem from './reducers/selectedItem';


const rootReducer = combineReducers({
    user,
    lastDate,
    currencies: items('currencies'),
    icons: items('icons'),
    accounts: items('accounts'),
    categories: items('categories'),
    selectedAccount: selectedItem('account')
});

const store = createStore(rootReducer, applyMiddleware(thunk));

window.store = store;

export default store;
