import React from 'react';

import './CategoryList.css';

import CategoryListItem from './CategoryListItem';

const CategoryList = ({
    categories,
    icons,
    selectCategory,
    selectedCategory
}) => {
    const categoriesListItems = Object.values(categories)
        .map(category => (
            <CategoryListItem
                key={category.id}
                category={category}
                icon={icons[category.iconId]}
                selectCategory={selectCategory}
                selectedCategory={selectedCategory}
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
