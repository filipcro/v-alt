import React from 'react';

import AccountList from './AccountList';
import NewAccount from './NewAccount';
import EditAccount from './EditAccount';

const Account = ({
    accounts,
    currencies,
    addAccount,
    selectAccount,
    updateAccount,
    selectedAccount,
    removeAccount
}) => (
    <div>
        {selectedAccount
            ? (
                <EditAccount
                    account={selectedAccount}
                    saveAccount={updateAccount}
                    selectAccount={selectAccount}
                    removeAccount={removeAccount}
                />
            )
            : (
                <NewAccount
                    currencies={currencies}
                    addAccount={addAccount}
                />
            )
        }
        <AccountList
            accounts={accounts}
            currencies={currencies}
            selectAccount={selectAccount}
            selectedAccount={selectedAccount}
        />
    </div>
);

export default Account;
