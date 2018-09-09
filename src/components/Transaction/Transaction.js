import React from 'react';

import TransactionList from '../../containers/TransactionList';
import TransactionFilter from '../../containers/TransactionFilter';
import TransactionForm from '../../containers/TransactionForm';

import './Transaction.css';

const Transaction = () => (
    <div>
        <div className="Transaction-edit">
            <TransactionForm />
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
