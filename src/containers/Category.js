import { connect } from 'react-redux';

import Category from '../components/Category/Category';
import { addCategory } from '../actions/categories';

// const getSelectedCategory = (selectedAccount, accounts) => {
//     if (selectAccount) {
//         return accounts[selectedAccount];
//     }
//     return null;
// };

const mapStateToProps = state => ({
    categories: state.categories,
    icons: state.icons
    // selectedAccount: getSelectedCategory(state.selectedAccount, state.accounts)
});

const mapDispatchToProps = dispatch => ({
    addCategory: (name, incomings, outgoings, icon) => dispatch(
        addCategory(name, incomings, outgoings, icon)
    )
    // selectAccount: id => dispatch(selectAccount(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Category);
