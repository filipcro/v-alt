import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import status from '../../constants/userStatus';
import './LogIn.css';

class LogIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const { logIn } = this.props;
        const { username, password } = this.state;
        logIn(username, password);
    }

    onChange(e) {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        const { username, password } = this.state;
        const { userStatus } = this.props;
        const ivnalidCredentials = userStatus === status.INVALID_CREDENTIALS;

        return (
            <div className="background-gradient">
                <div className="LogIn">
                    <h2 className="LogIn-header">Prijava</h2>
                    <hr />
                    <form>
                        {ivnalidCredentials && <span className="LogIn-error">Korisničko ime ili lozinka je neispravno.</span>}
                        <label className="LogIn-label-group">
                            <span>Korisničko ime</span>
                            <input className="LogIn-input" type="text" name="username" value={username} onChange={this.onChange} />
                        </label>
                        <label className="LogIn-label-group">
                            <span>Lozinka</span>
                            <input className="LogIn-input" type="password" name="password" value={password} onChange={this.onChange} />
                        </label>
                        <button type="button" className="LogIn-button" onClick={this.onSubmit}>
                            Prijavi se
                        </button>
                    </form>
                    <hr />
                    Nemate korisnički račun?
                    <Link to="/signup"> Registrirajte se.</Link>
                </div>
            </div>
        );
    }
}

export default LogIn;
