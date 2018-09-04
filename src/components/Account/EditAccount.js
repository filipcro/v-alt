import React from 'react';

import './EditAccount.css';

const EditAccount = ({
    account,
    saveAccount,
    selectAccount,
    removeAccount
}) => {
    let name;

    return (
        <div className="EditAccount">
            <h1>Izmjeni naziv računa</h1>
            <form className="EditAccount-form">
                <label className="EditAccount-label-group">
                    <span>Naziv računa: </span>
                    <input
                        type="text"
                        name="name"
                        ref={(node) => { name = node; }}
                        defaultValue={account.name}
                    />
                </label>
                <button
                    type="button"
                    className="EditAccount-save-account"
                    onClick={(e) => {
                        e.preventDefault();
                        saveAccount(account.id, name.value);
                        selectAccount(null);
                    }}
                >
                    Spremi
                </button>
                <button
                    type="button"
                    className="EditAccount-delete-account"
                    onClick={(e) => {
                        e.preventDefault();
                        removeAccount(account.id);
                        selectAccount(null);
                    }}
                >
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
