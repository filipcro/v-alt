import React from 'react';

import CategoryList from './CategoryList';
import NewCategory from './NewCategory';

const Category = ({
    categories,
    icons,
    addCategory
}) => (
    <div>
        <NewCategory
            icons={icons}
            addCategory={addCategory}
        />
        <CategoryList
            categories={categories}
            icons={icons}
            // selectAccount={selectAccount}
        />
    </div>
);

export default Category;
