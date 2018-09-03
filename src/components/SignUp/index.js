import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './SignUp.css';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            name: '',
            email: '',
            usernameTaken: false,
            emailTaken: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const { signUp } = this.props;
        const {
            username,
            password,
            email,
            name
        } = this.state;
        signUp(username, password, email, name);
    }

    onChange(e) {
        const { value, name } = e.target;
        this.setState({ [name]: value });

        if (name === 'username') {
            axios.get('/user/usernametaken', { params: { username: value } })
                .then(({ data }) => { this.setState({ usernameTaken: data.taken }); })
                .catch(() => { this.setState({ usernameTaken: false }); });
        }

        if (name === 'email') {
            axios.get('/user/emailtaken', { params: { email: value } })
                .then(({ data }) => { this.setState({ emailTaken: data.taken }); })
                .catch(() => { this.setState({ emailTaken: false }); });
        }
    }

    render() {
        const {
            username,
            password,
            email,
            name,
            usernameTaken,
            emailTaken
        } = this.state;

        return (
            <div className="background-gradient">
                <div className="SignUp">
                    <h2 className="SignUp-header">Registracija</h2>
                    <hr />
                    <form>
                        <label className="SignUp-label-group">
                            <span>Korisničko ime</span>
                            {usernameTaken && <span className="SignUp-error">Korisničko ime se već koristi.</span>}
                            <input className="SignUp-input" type="text" name="username" value={username} onChange={this.onChange} />
                        </label>
                        <label className="SignUp-label-group">
                            <span>Lozinka</span>
                            <input className="SignUp-input" type="password" name="password" value={password} onChange={this.onChange} />
                        </label>
                        <span className="SignUp-optional">Opcionalna polja:</span>
                        <label className="SignUp-label-group">
                            <span>Ime i prezime</span>
                            <input className="SignUp-input" type="text" name="name" value={name} onChange={this.onChange} />
                        </label>
                        <label className="SignUp-label-group">
                            <span>E-mail</span>
                            {emailTaken && <span className="SignUp-error">Email adresa se već koristi.</span>}
                            <input className="SignUp-input" type="text" name="email" value={email} onChange={this.onChange} />
                        </label>
                        <button type="button" className="SignUp-button" onClick={this.onSubmit}>
                            Registriraj se
                        </button>
                    </form>
                    <hr />
                    Već imate korisnički račun?
                    <Link to="/login"> Prijavite se.</Link>
                </div>
            </div>
        );
    }
}

export default SignUp;
