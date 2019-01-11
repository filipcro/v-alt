import React from 'react';

import './AccountList.css';

import AccountListItem from './AccountListItem';

const AccountList = ({
    accounts,
    currencies,
    selectAccount,
    selectedAccount
}) => {
    const accountsListItems = Object.values(accounts)
        .map(account => (
            <AccountListItem
                key={account.id}
                account={account}
                currencyCode={currencies[account.currencyId].code}
                selectAccount={selectAccount}
                selectedAccount={selectedAccount}
            />
        ));

    return (
        <div className="AccountList">
            <h1>Postojeći računi</h1>
            <ul className="AccountList-list">
                {accountsListItems}
            </ul>
        </div>
    );
};

export default AccountList;
