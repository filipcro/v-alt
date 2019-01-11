import { connect } from 'react-redux';

import TransactionFilter from '../components/Transaction/TransactionFilter';
import {
    setEndDate,
    setStartDate,
    switchCheckedAccount,
    switchCheckedCategory
} from '../actions/transactionFilter';

const mapStateToProps = state => ({
    accounts: state.accounts,
    categories: state.categories,
    endDate: state.transactionFilter.endDate,
    startDate: state.transactionFilter.startDate,
    checkedAccounts: state.transactionFilter.checkedAccounts,
    checkedCategories: state.transactionFilter.checkedCategories
});

const mapDispatchToProps = dispatch => ({
    setEndDate: endDate => dispatch(setEndDate(endDate)),
    setStartDate: startDate => dispatch(setStartDate(startDate)),
    switchCheckedAccount: accountId => dispatch(switchCheckedAccount(accountId)),
    switchCheckedCategory: categoryId => dispatch(switchCheckedCategory(categoryId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransactionFilter);
