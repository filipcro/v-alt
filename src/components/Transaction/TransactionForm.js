import React, { Component, Fragment } from 'react';
import DateTime from 'react-datetime';
import moment from 'moment';

import './TransactionForm.css';

class TransactionForm extends Component {
    constructor(props) {
        super(props);

        const { transaction } = props;

        if (transaction) {
            this.state = {
                transactionId: transaction.id,
                amount: transaction.amount,
                currency: transaction.currencyId,
                category: transaction.categoryId,
                account: transaction.accountId,
                dateTime: transaction.dateTime,
                description: transaction.description
            };
        } else {
            this.state = {
                amount: 0,
                currency: '1',
                dateTime: moment(),
                description: ''
            };
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onCancle = this.onCancle.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const { addTransaction, updateTransaction, selectTransaction } = this.props;

        const {
            transactionId,
            amount,
            currency,
            dateTime,
            description,
            category,
            account
        } = this.state;

        const transaction = {
            amount,
            dateTime,
            description,
            categoryId: category || undefined,
            currencyId: currency,
            accountId: account
        };

        if (transactionId) {
            updateTransaction(transactionId, transaction);
            selectTransaction(null);
        } else {
            addTransaction(transaction);
        }
    }

    onCancle(e) {
        e.preventDefault();
        const { selectTransaction } = this.props;
        selectTransaction(null);
    }

    onDelete(e) {
        e.preventDefault();
        const { selectTransaction, removeTransaction } = this.props;
        const { transactionId } = this.state;
        removeTransaction(transactionId);
        selectTransaction(null);
    }

    onChange(e) {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    }

    onDateChange(date) {
        this.setState({ dateTime: date });
    }

    static getDerivedStateFromProps(props, state) {
        const { transaction, accounts } = props;
        const { transactionId, account } = state;

        if (accounts && !account) {
            return {
                ...state,
                account: Object.keys(accounts)[0]
            };
        }

        if (transaction && transaction.id !== state.transactionId) {
            return {
                transactionId: transaction.id,
                amount: transaction.amount,
                currency: transaction.currencyId,
                category: transaction.categoryId,
                account: transaction.accountId,
                dateTime: transaction.dateTime,
                description: transaction.description
            };
        }

        if (transactionId && !transaction) {
            return {
                transactionId: null,
                amount: 0,
                category: null,
                dateTime: moment(),
                description: ''
            };
        }

        return null;
    }

    checkChategoryAndAmount() {
        const { category, amount } = this.state;
        const { categories } = this.props;
        const selectedCategory = category ? categories[category] : null;
        if (selectedCategory) {
            if (!selectedCategory.incomings && amount > 0) {
                return 'Kategorija nije namjenjena za spremanje prihoda.';
            }
            if (!selectedCategory.outgoings && amount < 0) {
                return 'Kategorija nije namjenjena za spremanje rashoda.';
            }
        }
        return '';
    }

    render() {
        const {
            currencies,
            accounts,
            categories
        } = this.props;

        const currencyOptions = Object.values(currencies).map(
            currency => <option value={currency.id} key={currency.id}>{currency.code}</option>
        );

        const accountOptions = Object.values(accounts).map(
            account => <option value={account.id} key={account.id}>{account.name}</option>
        );

        const categoryOptions = Object.values(categories).map(
            category => <option value={category.id} key={category.id}>{category.name}</option>
        );

        const {
            transactionId,
            amount,
            currency,
            dateTime,
            account,
            category,
            description
        } = this.state;

        return (
            <div className="NewAccount">
                <h1>Nova transakcija</h1>
                <form className="NewAccount-form">
                    <label className="label-group">
                        <span>Iznos: </span>
                        <input type="number" name="amount" step="0.01" value={amount} onChange={this.onChange} />
                    </label>
                    <label className="label-group">
                        <span>Valuta: </span>
                        <select name="currency" value={currency} onChange={this.onChange}>
                            {currencyOptions}
                        </select>
                    </label>
                    <label className="label-group">
                        <span>Datum i vrijeme: </span>
                        <DateTime value={dateTime} onChange={this.onDateChange} />
                    </label>
                    <label className="label-group">
                        <span>Račun: </span>
                        <select name="account" value={account} onChange={this.onChange}>
                            {accountOptions}
                        </select>
                    </label>
                    <label className="label-group">
                        <span>Kategorija: </span>
                        <select name="category" value={category} onChange={this.onChange}>
                            <option value="" />
                            {categoryOptions}
                        </select>
                    </label>
                    <span className="SignUp-error">{this.checkChategoryAndAmount()}</span>
                    <label className="label-group">
                        <span>Opis: </span>
                        <input type="text" name="description" value={description} onChange={this.onChange} />
                    </label>
                    {transactionId
                        ? (
                            <Fragment>
                                <button type="submit" className="btn-save" onClick={this.onSubmit}>
                                    Izmjeni
                                </button>
                                <button type="button" className="btn-delete" onClick={this.onDelete}>
                                    Izbriši transakciju
                                </button>
                                <button type="button" className="btn-cancel" onClick={this.onCancle}>
                                    Odustani
                                </button>
                            </Fragment>
                        ) : (
                            <button type="submit" className="btn-save" onClick={this.onSubmit}>
                                Dodaj
                            </button>
                        )
                    }
                </form>
            </div>
        );
    }
}

export default TransactionForm;
