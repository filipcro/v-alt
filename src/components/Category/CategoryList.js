import React from 'react';

import './CategoryList.css';

import CategoryListItem from './CategoryListItem';

const CategoryList = ({ categories, icons }) => {
    const categoriesListItems = Object.values(categories)
        .map(category => (
            <CategoryListItem
                key={category.id}
                category={category}
                iconSVG={icons[category.iconId].svg}
            />
        ));

    return (
        <div className="CategoryList">
            <h1>Postojeće kategorije</h1>
            <ul className="CategoryList-list">
                {categoriesListItems}
            </ul>
        </div>
    );
};

export default CategoryList;
