import { connect } from 'react-redux';

import AccountBalance from '../components/Report/AccountBalance';

const getAccountsBalance = (
    accountSums,
    transactions,
    accounts,
    currencies
) => Object.values(accountSums)
    .map((account) => {
        const balance = Object.values(transactions)
            .filter(transaction => transaction.accountId === account.id)
            .reduce(
                (sum, transaction) => sum + transaction.rate * transaction.amount,
                +account.sum
            );

        return {
            id: account.id,
            accountName: accounts[account.id].name,
            currencyCode: currencies[accounts[account.id].currencyId].code,
            balance
        };
    });


const mapStateToProps = state => ({
    accountsBalance: getAccountsBalance(
        state.accountSums,
        state.transactions,
        state.accounts,
        state.currencies
    )
});


export default connect(
    mapStateToProps
)(AccountBalance);
