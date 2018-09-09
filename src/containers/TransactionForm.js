import { connect } from 'react-redux';

import TransactionForm from '../components/Transaction/TransactionForm';
import {
    addTransaction,
    updateTransaction,
    removeTransaction,
    selectTransaction
} from '../actions/transactions';

const mapStateToProps = state => ({
    accounts: state.accounts,
    categories: state.categories,
    currencies: state.currencies,
    transaction: state.selectedTransaction ? state.transactions[state.selectedTransaction] : null
});

const mapDispatchToProps = dispatch => ({
    addTransaction: transaction => dispatch(addTransaction(transaction)),
    updateTransaction: (id, transaction) => dispatch(updateTransaction(id, transaction)),
    removeTransaction: id => dispatch(removeTransaction(id)),
    selectTransaction: id => dispatch(selectTransaction(id))
});

const TransactionFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { pure: false }
)(TransactionForm);

export default TransactionFormContainer;
