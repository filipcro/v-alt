import React from 'react';
import { Route } from 'react-router-dom';

import MenuBar from '../MenuBar';
import Account from '../../containers/Account';
import Category from '../../containers/Category';

import './Layout.css';

const Layout = ({ user, logOut }) => (
    <div className="background-gray">
        <MenuBar user={user} logOut={logOut} />
        <div className="Layout">
            <Route path="/accounts" component={Account} />
            <Route path="/categories" component={Category} />
        </div>
    </div>
);


export default Layout;
