import { connect } from 'react-redux';

import Transaction from '../components/Transaction/Transaction';

const mapStateToProps = state => ({
    transactions: state.transactions,
    accounts: state.accounts,
    categories: state.categories,
    icons: state.icons,
    currencies: state.currencies
});

export default connect(
    mapStateToProps
)(Transaction);
