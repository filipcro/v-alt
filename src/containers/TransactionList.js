import { connect } from 'react-redux';

import TransactionList from '../components/Transaction/TransactionList';

const getTransactions = (
    transactions,
    {
        startDate,
        endDate,
        checkedAccounts,
        checkedCategories
    }
) => Object.values(transactions)
    .filter(({ dateTime }) => dateTime >= startDate && dateTime <= endDate)
    .filter(({ accountId }) => checkedAccounts[accountId])
    .filter(({ categoryId }) => {
        if (categoryId) {
            return checkedCategories[categoryId];
        }
        return checkedCategories['0'];
    })
    .sort((t1, t2) => t2.dateTime.diff(t1.dateTime));


const mapStateToProps = state => ({
    transactions: getTransactions(state.transactions, state.transactionFilter),
    accounts: state.accounts,
    categories: state.categories,
    icons: state.icons,
    currencies: state.currencies
});

export default connect(
    mapStateToProps
)(TransactionList);
