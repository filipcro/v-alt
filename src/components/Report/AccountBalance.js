import React from 'react';

const AccountBalance = ({
    accountsBalance
}) => {
    const tableRows = accountsBalance
        .map(accountBalance => (
            <tr key={accountBalance.id}>
                <td>{accountBalance.accountName}</td>
                <td>
                    {accountBalance.balance.toLocaleString('hr-HR', {
                        style: 'currency',
                        currency: accountBalance.currencyCode
                    })
                    }
                </td>
            </tr>
        ));

    return (
        <table>
            <thead>
                <tr>
                    <th>Račun</th>
                    <th>Stanje računa</th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    );
};

export default AccountBalance;
