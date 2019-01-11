import React from 'react';

import CategoryList from './CategoryList';
import NewCategory from './NewCategory';
import EditCategory from './EditCategory';

const Category = ({
    categories,
    icons,
    addCategory,
    updateCategory,
    removeCategory,
    selectedCategory,
    selectCategory
}) => (
    <div>
        {
            selectedCategory
                ? (
                    <EditCategory
                        icons={icons}
                        addCategory={addCategory}
                        selectedCategory={selectedCategory}
                        selectCategory={selectCategory}
                        updateCategory={updateCategory}
                        removeCategory={removeCategory}
                    />
                ) : (
                    <NewCategory
                        icons={icons}
                        addCategory={addCategory}
                    />
                )
        }
        <CategoryList
            categories={categories}
            icons={icons}
            selectCategory={selectCategory}
            selectedCategory={selectedCategory}
        />
    </div>
);

export default Category;
