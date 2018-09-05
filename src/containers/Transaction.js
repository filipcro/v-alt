import { connect } from 'react-redux';

import { addTransaction } from '../actions/transactions';
import Transaction from '../components/Transaction/Transaction';

const mapStateToProps = state => ({
    accounts: state.accounts,
    categories: state.categories,
    currencies: state.currencies
});

const mapDispatchToProps = dispatch => ({
    addTransaction: (
        amount,
        currency,
        dateTime,
        account,
        category,
        description
    ) => dispatch(addTransaction(
        amount,
        currency,
        dateTime,
        account,
        category,
        description
    ))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Transaction);
