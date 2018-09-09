import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import MenuBar from '../MenuBar';
import Account from '../../containers/Account';
import Category from '../../containers/Category';
import Transaction from '../Transaction/Transaction';

import './Layout.css';

const Layout = ({ user, logOut }) => (
    <div className="background-gray">
        <MenuBar user={user} logOut={logOut} />
        <div className="Layout">
            <Switch>
                <Route path="/transactions" component={Transaction} />
                <Route path="/accounts" component={Account} />
                <Route path="/categories" component={Category} />
                <Redirect exact from="/" to="/transactions" />
            </Switch>
        </div>
    </div>
);


export default Layout;
