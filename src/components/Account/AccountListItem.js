import React from 'react';

import './AccountListItem.css';

const AccountListItem = ({ account, currencyCode }) => (
    <li className="AccountListItem">
        <span>{account.name}</span>
        <span className="AccountListItem-currency">{currencyCode}</span>
    </li>
);

export default AccountListItem;
