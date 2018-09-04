import React from 'react';

import TransactionList from './TransactionList';

import './Transaction.css';

const Transaction = ({
    transactions,
    currencies,
    accounts,
    categories,
    icons
}) => (
    <div className="Transaction">
        <div className="Transaction-filter">
            
        </div>
        <div className="Transaction-list">
            <TransactionList
                transactions={transactions}
                currencies={currencies}
                accounts={accounts}
                categories={categories}
                icons={icons}
            />
        </div>
    </div>
);

export default Transaction;
