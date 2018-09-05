import React from 'react';

import TransactionList from '../../containers/TransactionList';
import TransactionFilter from '../../containers/TransactionFilter';
import NewTransaction from './NewTransaction';

import './Transaction.css';

const Transaction = ({
    currencies,
    accounts,
    categories,
    addTransaction
}) => (
    <div>
        <div className="Transaction-edit">
            <NewTransaction
                accounts={accounts}
                categories={categories}
                currencies={currencies}
                addTransaction={addTransaction}
            />
        </div>

        <div className="Transaction">
            <div className="Transaction-filter">
                <TransactionFilter />
            </div>
            <div className="Transaction-list">
                <TransactionList />
            </div>
        </div>
    </div>
);

export default Transaction;
