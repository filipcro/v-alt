import React from 'react';

import Icon from '../Icon';

import './TransactionListItem.css';
import AdditionsSVG from './up-green.svg';
import SubrtactionsSVG from './down-red.svg';

const TransactionListItem = ({
    transaction,
    currency,
    account,
    category,
    icon
}) => (
    <div className="TransactionListItem">
        <div className="TransactionListItem-row">
            <div className="TransactionListItem-icon-group">
                {transaction.amount < 0
                    ? <img src={SubrtactionsSVG} alt="rashod" />
                    : <img src={AdditionsSVG} alt="prihod" />
                }
                {transaction.amount.toLocaleString('hr-HR', {
                    style: 'currency',
                    currency: currency.code
                })}
            </div>
            <div>
                {transaction.dateTime.format('dddd,  DD.MM.YYYY, H:mm')}
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
