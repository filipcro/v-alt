import React from 'react';

import './NewCategory.css';

const EditAccount = ({ icons, addCategory }) => {
    let name;
    let select;
    let incomings;
    let outgoing;

    const options = Object.values(icons).map(
        icon => <option key={icon.id} value={icon.id}>{icon.name}</option>
    );

    return (
        <div className="NewCategory">
            <h1>Nova kategorija</h1>
            <form
                className="NewAccount-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    addCategory(name.value, incomings.checked, outgoing.checked, select.value);
                    name.value = '';
                    incomings.checked = false;
                    outgoing.checked = false;
                }}
            >
                <label className="NewCategory-label-group">
                    <span>Naziv kategorije: </span>
                    <input type="text" name="name" ref={(node) => { name = node; }} />
                </label>
                <label className="NewCategory-label-group">
                    <span>Ikona: </span>
                    <select ref={(node) => { select = node; }}>
                        {options}
                    </select>
                </label>
                <label className="NewCategory-label-group">
                    <span>Prihodi: </span>
                    <input type="checkbox" name="incomings" ref={(node) => { incomings = node; }} />
                </label>
                <label className="NewCategory-label-group">
                    <span>Rashodi: </span>
                    <input type="checkbox" name="outgoings" ref={(node) => { outgoing = node; }} />
                </label>
                <button type="submit" className="NewCategory-add-account">
                    Dodaj
                </button>
            </form>
        </div>
    );
};

export default EditAccount;
