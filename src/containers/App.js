import { connect } from 'react-redux';

import { logIn, logOut, signUp } from '../actions/user';
import App from '../components/App';


const mapStateToProps = state => ({
    user: state.user,
    userStatus: state.userStatus
});

const mapDispatchToProps = dispatch => ({
    logIn: (username, password) => dispatch(logIn(username, password)),
    logOut: () => dispatch(logOut()),
    signUp: (username, password, email, name) => dispatch(signUp(username, password, email, name))
});

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { pure: false }
)(App);

export default AppContainer;
