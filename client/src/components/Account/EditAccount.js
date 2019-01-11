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
                <label className="label-group">
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
                    className="btn-save"
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
                    className="btn-delete"
                    onClick={(e) => {
                        e.preventDefault();
                        removeAccount(account.id);
                        selectAccount(null);
                    }}
                >
                    Izbriši račun
                </button>
                <button
                    className="btn-cancel"
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
