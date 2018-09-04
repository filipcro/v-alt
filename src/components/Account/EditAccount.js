import React from 'react';

import './EditAccount.css';

const EditAccount = ({ account, saveAccount, selectAccount }) => {
    let name;


    return (
        <div className="EditAccount">
            <h1>Izmjeni naziv računa</h1>
            <form
                className="EditAccount-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    saveAccount(account.id, name.value);
                    name.value = '';
                }}
            >
                <label className="EditAccount-label-group">
                    <span>Naziv računa: </span>
                    <input type="text" name="name" ref={(node) => { name = node; }} />
                </label>
                <button type="button" className="EditAccount-save-account">
                    Spremi
                </button>
                <button type="button" className="EditAccount-delete-account">
                    Izbriši račun
                </button>
                <button
                    className="EditAccount-cancel"
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        selectAccount(null);
                    }}
                >
                    Odustani
                </button>
            </form>
        </div>
    );
};

export default EditAccount;
