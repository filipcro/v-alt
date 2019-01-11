import React from 'react';

import './EditCategory.css';

const EditAccount = ({
    icons,
    selectedCategory,
    selectCategory,
    updateCategory,
    removeCategory
}) => {
    let name;
    let select;
    let incomings;
    let outgoings;

    const options = Object.values(icons).map(
        icon => <option key={icon.id} value={icon.id}>{icon.name}</option>
    );

    return (
        <div className="EditCategory">
            <h1>Izmjeni kategorija</h1>
            <form className="EditCategory-form">
                <label className="label-group">
                    <span>Naziv kategorije: </span>
                    <input
                        type="text"
                        name="name"
                        ref={(node) => { name = node; }}
                        defaultValue={selectedCategory.name}
                    />
                </label>
                <label className="label-group">
                    <span>Ikona: </span>
                    <select
                        name="icon"
                        defaultValue={selectedCategory.iconId}
                        ref={(node) => { select = node; }}
                    >
                        {options}
                    </select>
                </label>
                <label className="label-group">
                    <span>Prihodi: </span>
                    <input
                        type="checkbox"
                        name="incomings"
                        ref={(node) => { incomings = node; }}
                        defaultChecked={selectedCategory.incomings}
                    />
                </label>
                <label className="label-group">
                    <span>Rashodi: </span>
                    <input
                        type="checkbox"
                        name="outgoings"
                        ref={(node) => { outgoings = node; }}
                        defaultChecked={selectedCategory.outgoings}
                    />
                </label>

                <button
                    type="button"
                    className="btn-save"
                    onClick={(e) => {
                        e.preventDefault();
                        updateCategory(
                            selectedCategory.id,
                            name.value,
                            incomings.checked,
                            outgoings.checked,
                            select.value
                        );
                        selectCategory(null);
                    }}
                >
                    Spremi
                </button>
                <button
                    type="button"
                    className="btn-delete"
                    onClick={(e) => {
                        e.preventDefault();
                        removeCategory(selectedCategory.id);
                        selectCategory(null);
                    }}
                >
                    Izbriši kategoriju
                </button>
                <button
                    className="btn-cancel"
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        selectCategory(null);
                    }}
                >
                    Odustani
                </button>

            </form>
        </div>
    );
};

export default EditAccount;
