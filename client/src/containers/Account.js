import { connect } from 'react-redux';

import Account from '../components/Account/Account';
import {
    addAccount,
    selectAccount,
    updateAccount,
    removeAccount
} from '../actions/accounts';

const getSelectedAccount = (selectedAccount, accounts) => {
    if (selectAccount) {
        return accounts[selectedAccount];
    }
    return null;
};

const mapStateToProps = state => ({
    accounts: state.accounts,
    currencies: state.currencies,
    selectedAccount: getSelectedAccount(state.selectedAccount, state.accounts)
});

const mapDispatchToProps = dispatch => ({
    addAccount: (name, currency) => dispatch(addAccount(name, currency)),
    updateAccount: (id, name) => dispatch(updateAccount(id, name)),
    removeAccount: id => dispatch(removeAccount(id)),

    selectAccount: id => dispatch(selectAccount(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Account);
