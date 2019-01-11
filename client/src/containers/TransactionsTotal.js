import { connect } from 'react-redux';

import TransactionsTotal from '../components/Report/TransactionsTotal';

const getTotalInPeriod = (
    accounts,
    transactions,
    startDate,
    endDate
) => Object.values(accounts)
    .map(
        account => Object.values(transactions)
            .filter(({ accountId }) => accountId === account.id)
            .filter(({ dateTime }) => dateTime >= startDate && dateTime <= endDate)
            .reduce((total, { amount, rate }) => {
                const newTotal = { ...total };
                if (amount > 0) {
                    newTotal.additions += amount * rate;
                } else {
                    newTotal.subtractions -= amount * rate;
                }
                return newTotal;
            }, {
                account,
                additions: 0,
                subtractions: 0
            })
    ).filter(({ additions, subtractions }) => additions > 0 || subtractions > 0);

const mapStateToProps = state => ({
    totalTransactions: getTotalInPeriod(
        state.accounts,
        state.transactions,
        state.transactionFilter.startDate,
        state.transactionFilter.endDate
    ),
    currencies: state.currencies
});

export default connect(
    mapStateToProps
)(TransactionsTotal);
