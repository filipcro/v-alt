import React from 'react';

import AccountList from './AccountList';
import NewAccount from './NewAccount';
import EditAccount from './EditAccount';

const Account = ({
    accounts,
    currencies,
    addAccount,
    selectAccount,
    selectedAccount
}) => (
    <div>
        {selectedAccount
            ? (
                <EditAccount
                    account={accounts[selectedAccount]}
                    saveAccount={(...a) => console.log(a)}
                    selectAccount={selectAccount}
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
        />
    </div>
);

export default Account;
