import React from 'react';

import './AccountListItem.css';

const AccountListItem = ({
    account,
    currencyCode,
    selectAccount,
    selectedAccount
}) => (
    <li className="AccountListItem">
        <span>{account.name}</span>
        <span className="AccountListItem-currency">{currencyCode}</span>
        {!selectedAccount && (
            <button
                type="button"
                className="AccountListItem-button"
                onClick={() => selectAccount(account.id)}
            >
                Izmjeni
            </button>
        )}
    </li>
);

export default AccountListItem;
