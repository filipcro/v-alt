import React from 'react';

import TransactionListItem from './TransactionListItem';

const TransactionList = ({
    transactions,
    currencies,
    accounts,
    categories,
    icons,
    selectTransaction
}) => {
    const transactionsItems = transactions.map(
        (transaction) => {
            const category = categories[transaction.categoryId];
            let icon = null;
            if (category) {
                icon = icons[category.iconId];
            }
            const account = accounts[transaction.accountId];
            const currency = currencies[transaction.currencyId];

            return (
                <TransactionListItem
                    key={transaction.id}
                    transaction={transaction}
                    account={account}
                    category={category}
                    currency={currency}
                    icon={icon}
                    selectTransaction={selectTransaction}
                />
            );
        }
    );

    return (
        <div>
            <h1>Transakcije</h1>
            {transactionsItems}
        </div>
    );
};

export default TransactionList;
