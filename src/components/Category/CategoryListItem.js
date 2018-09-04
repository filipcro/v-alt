import React from 'react';

import './CategoryListItem.css';

import Icon from '../Icon';

const CategoryListItem = ({ category, icon }) => (
    <li className="CategoryListItem">
        <Icon
            icon={icon}
            className="CategoryListItem-icon"
        />
        <span>{category.name}</span>
    </li>
);

export default CategoryListItem;
