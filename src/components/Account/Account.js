import React from 'react';

import AccountList from './AccountList';
import NewAccount from './NewAccount';

const Account = ({
    accounts,
    currencies,
    addAccount,
    selectAccount
}) => (
    <div>
        <NewAccount
            currencies={currencies}
            addAccount={addAccount}
        />
        <AccountList
            accounts={accounts}
            currencies={currencies}
            selectAccount={selectAccount}
        />
    </div>
);

export default Account;
