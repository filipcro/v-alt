import React from 'react';

import './AccountListItem.css';

const AccountListItem = ({ account, currencyCode, selectAccount }) => (
    <li className="AccountListItem">
        <span>{account.name}</span>
        <span className="AccountListItem-currency">{currencyCode}</span>
        <button
            type="button"
            className="AccountListItem-button"
            onClick={() => selectAccount(account.id)}
        >
            Izmjeni
        </button>
    </li>
);

export default AccountListItem;
