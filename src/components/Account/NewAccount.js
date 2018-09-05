import React from 'react';

import './NewAccount.css';

const NewAccount = ({ currencies, addAccount }) => {
    let name;
    let select;

    const options = Object.values(currencies).map(
        currency => <option value={currency.id} key={currency.id}>{currency.code}</option>
    );

    return (
        <div className="NewAccount">
            <h1>Novi račun</h1>
            <form
                className="NewAccount-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    addAccount(name.value, select.value);
                    name.value = '';
                }}
            >
                <label className="label-group">
                    <span>Naziv računa: </span>
                    <input type="text" name="name" ref={(node) => { name = node; }} />
                </label>
                <label className="label-group">
                    <span>Valuta: </span>
                    <select ref={(node) => { select = node; }}>
                        {options}
                    </select>
                </label>
                <button type="submit" className="NewAccount-add-account">
                    Dodaj
                </button>
            </form>
        </div>
    );
};

export default NewAccount;
