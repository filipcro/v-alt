import React from 'react';
import { NavLink } from 'react-router-dom';

import './MenuBar.css';

const MenuBar = ({ user, logOut }) => {
    const name = (user.name) ? (user.name) : (user.username);

    return (
        <nav className="MenuBar">
            <NavLink className="MenuBar-link" to="/transactions" activeClassName="MenuBar-link-active">Transakcije</NavLink>
            <NavLink className="MenuBar-link" to="/categories" activeClassName="MenuBar-link-active">Kategorije</NavLink>
            <NavLink className="MenuBar-link" to="/accounts" activeClassName="MenuBar-link-active">Računi</NavLink>
            <NavLink className="MenuBar-link" to="/reports" activeClassName="MenuBar-link-active">Izvještaji</NavLink>
            <span className="MenuBar-label">
                {'Dobro došli, '}
                {name}
            </span>
            <button className="MenuBar-link MenuBar-logout" type="button" onClick={logOut}>
                Odjavi se
            </button>
        </nav>
    );
};

export default MenuBar;
