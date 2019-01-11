import React from 'react';

import Icon from '../Icon';

import './CategoryListItem.css';
import AdditionsSVG from '../Transaction/up-green.svg';
import SubtractionsSVG from '../Transaction/down-red.svg';

const CategoryListItem = ({
    category,
    icon,
    selectedCategory,
    selectCategory
}) => (
    <li className="CategoryListItem">
        <Icon
            icon={icon}
            className="CategoryListItem-icon"
        />
        <span>{category.name}</span>
        {category.incomings && <img src={AdditionsSVG} alt="prihod" />}
        {category.outgoings && <img src={SubtractionsSVG} alt="rashod" />}
        {!selectedCategory && (
            <button
                type="button"
                className="CategoryListItem-button"
                onClick={() => selectCategory(category.id)}
            >
                Izmjeni
            </button>
        )}
    </li>
);

export default CategoryListItem;
