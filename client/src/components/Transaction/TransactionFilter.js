import React from 'react';
import DateTime from 'react-datetime';

import './TransactionFilter.css';

const TransactonFilter = ({
    accounts,
    categories,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    checkedAccounts,
    checkedCategories,
    switchCheckedAccount,
    switchCheckedCategory
}) => {
    const accountsCheckboxes = Object.values(accounts)
        .map(account => (
            <label className="label-group" key={account.id}>
                <input
                    type="checkbox"
                    name={account.name}
                    defaultChecked={checkedAccounts[account.id]}
                    onChange={() => switchCheckedAccount(account.id)}
                />
                <span>{account.name}</span>
            </label>
        ));

    const categoriesCheckboxes = Object.values(categories)
        .map(category => (
            <label className="label-group" key={category.id}>
                <input
                    type="checkbox"
                    name={category.name}
                    defaultChecked={checkedCategories[category.id]}
                    onChange={() => switchCheckedCategory(category.id)}
                />
                <span>{category.name}</span>
            </label>
        ));

    return (
        <div className="TransactionFilter">
            <h2>Datum početka</h2>
            <DateTime locale="hr" value={startDate} onChange={setStartDate} timeFormat={false} />
            <h2>Datum završetka</h2>
            <DateTime locale="hr" value={endDate} onChange={setEndDate} timeFormat={false} />
            <h2>Prikazani računi</h2>
            {accountsCheckboxes}
            <h2>Prikazane kategorije</h2>
            {categoriesCheckboxes}
            <label className="label-group">
                <input
                    type="checkbox"
                    name="noCategory"
                    defaultChecked={checkedCategories['0']}
                    onChange={() => switchCheckedCategory('0')}
                />
                <span><i>Bez kategorije</i></span>
            </label>
        </div>
    );
};

export default TransactonFilter;
