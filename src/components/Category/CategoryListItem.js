import React from 'react';

import './CategoryListItem.css';


const CategoryListItem = ({ category, iconSVG }) => (
    <li className="CategoryListItem">
        <svg
            height="32"
            width="32"
            className="CategoryListItem-icon"
            dangerouslySetInnerHTML={{ __html: iconSVG }}
        />
        <span>{category.name}</span>
    </li>
);

export default CategoryListItem;
