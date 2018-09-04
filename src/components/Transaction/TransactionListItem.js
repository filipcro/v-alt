import React from 'react';

import Icon from '../Icon';

import './TransactionListItem.css';

const TransactionListItem = ({
    transaction,
    currency,
    account,
    category,
    icon
}) => (
    <div className="TransactionListItem">
        <div className="TransactionListItem-row">
            <div>
                {transaction.dateTime.toLocaleString('hr-HR')}
            </div>
            <div>
                {transaction.amount.toLocaleString('hr-HR', {
                    style: 'currency',
                    currency: currency.code
                })}
            </div>
        </div>
        <div className="TransactionListItem-row">
            <div>{account.name}</div>
            {category
            && (
                <div className="TransactionListItem-icon-group">
                    <Icon icon={icon} />
                    {category && category.name}
                </div>
            )}
        </div>
        <div className="TransactionListItem-row">
            {transaction.description}
        </div>
    </div>
);

export default TransactionListItem;
