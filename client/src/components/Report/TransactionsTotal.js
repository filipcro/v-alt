import React from 'react';

import AccountTotal from './AccountTotal';

import './TransactionsTotal.css';

const TransactionsTotal = ({ totalTransactions, currencies }) => {
    const accountTotals = totalTransactions.map(total => (
        <AccountTotal
            key={total.account.id}
            accountTotal={total}
            currency={currencies[total.account.currencyId]}
        />
    ));

    return (
        <div className="TransactionsTotal">
            {accountTotals}
        </div>
    );
};

export default TransactionsTotal;
