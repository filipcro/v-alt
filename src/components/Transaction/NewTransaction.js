import React from 'react';
import DateTime from 'react-datetime';

import './NewTransaction.css';

const NewTransaction = ({
    currencies,
    accounts,
    categories,
    addTransaction
}) => {
    const currencyOptions = Object.values(currencies).map(
        currency => <option value={currency.id} key={currency.id}>{currency.code}</option>
    );

    const accountOptions = Object.values(accounts).map(
        account => <option value={account.id} key={account.id}>{account.name}</option>
    );

    const categoryOptions = Object.values(categories).map(
        category => <option value={category.id} key={category.id}>{category.name}</option>
    );

    let amount;
    let currency;
    let dateTime;
    let account;
    let category;
    let description;

    return (
        <div className="NewAccount">
            <h1>Nova transakcija</h1>
            <form
                className="NewAccount-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    addTransaction(
                        amount.value,
                        currency.value,
                        dateTime.state.selectedValue,
                        account.value,
                        category.value,
                        description.value
                    );
                }}
            >

                <label className="label-group">
                    <span>Iznos: </span>
                    <input type="number" name="amount" step="0.01" ref={(node) => { amount = node; }} />
                </label>
                <label className="label-group">
                    <span>Valuta: </span>
                    <select ref={(node) => { currency = node; }}>
                        {currencyOptions}
                    </select>
                </label>
                <label className="label-group">
                    <span>Datum i vrijeme: </span>
                    <DateTime ref={(node) => { dateTime = node; }} />
                </label>
                <label className="label-group">
                    <span>Račun: </span>
                    <select ref={(node) => { account = node; }}>
                        {accountOptions}
                    </select>
                </label>
                <label className="label-group">
                    <span>Kategorija: </span>
                    <select ref={(node) => { category = node; }}>
                        <option value="" />
                        {categoryOptions}
                    </select>
                </label>
                <label className="label-group">
                    <span>Opis: </span>
                    <input type="text" ref={(node) => { description = node; }} />
                </label>
                <button type="submit" className="NewAccount-add-account">
                    Dodaj
                </button>
            </form>
        </div>
    );
};

export default NewTransaction;
