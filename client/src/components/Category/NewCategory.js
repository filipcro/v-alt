import React from 'react';

import './NewCategory.css';

const EditAccount = ({ icons, addCategory }) => {
    let name;
    let select;
    let incomings;
    let outgoings;

    const options = Object.values(icons).map(
        icon => <option key={icon.id} value={icon.id}>{icon.name}</option>
    );

    return (
        <div className="NewCategory">
            <h1>Nova kategorija</h1>
            <form
                className="NewCategory-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    addCategory(name.value, incomings.checked, outgoings.checked, select.value);
                    name.value = '';
                    incomings.checked = false;
                    outgoings.checked = false;
                }}
            >
                <label className="label-group">
                    <span>Naziv kategorije: </span>
                    <input type="text" name="name" ref={(node) => { name = node; }} />
                </label>
                <label className="label-group">
                    <span>Ikona: </span>
                    <select ref={(node) => { select = node; }}>
                        {options}
                    </select>
                </label>
                <label className="label-group">
                    <span>Prihodi: </span>
                    <input type="checkbox" name="incomings" ref={(node) => { incomings = node; }} />
                </label>
                <label className="label-group">
                    <span>Rashodi: </span>
                    <input type="checkbox" name="outgoings" ref={(node) => { outgoings = node; }} />
                </label>
                <button type="submit" className="btn-save">
                    Dodaj
                </button>
            </form>
        </div>
    );
};

export default EditAccount;
