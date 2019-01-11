import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import store from '../store';
import { fetchUser } from '../actions/user';

import LogIn from './LogIn';
import SignUp from './SignUp';
import Layout from './Layout';

class App extends Component {
    componentDidMount() {
        store.dispatch(fetchUser());
    }

    render() {
        const {
            user,
            userStatus,
            logIn,
            signUp,
            logOut
        } = this.props;

        return (
            <Switch>
                <Route
                    path="/login"
                    render={() => (user ? (<Redirect to="/" />) : (<LogIn logIn={logIn} userStatus={userStatus} />))}
                />
                <Route
                    path="/signup"
                    render={() => (user ? (<Redirect to="/" />) : (<SignUp signUp={signUp} />))}
                />
                <Route
                    path="/"
                    render={() => (user ? (<Layout user={user} logOut={logOut} />) : (<Redirect to="/login" />))}
                />
            </Switch>
        );
    }
}

export default App;
