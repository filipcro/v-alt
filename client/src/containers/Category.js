import { connect } from 'react-redux';

import Category from '../components/Category/Category';
import {
    addCategory,
    updateCategory,
    removeCategory,
    selectCategory
} from '../actions/categories';

const getSelectedCategory = (selectedCategory, categories) => {
    if (selectedCategory) {
        return categories[selectedCategory];
    }
    return null;
};

const mapStateToProps = state => ({
    categories: state.categories,
    icons: state.icons,
    selectedCategory: getSelectedCategory(state.selectedCategory, state.categories)
});

const mapDispatchToProps = dispatch => ({
    addCategory: (name, incomings, outgoings, icon) => dispatch(
        addCategory(name, incomings, outgoings, icon)
    ),
    updateCategory: (id, name, incomings, outgoings, icon) => dispatch(
        updateCategory(id, name, incomings, outgoings, icon)
    ),
    removeCategory: id => dispatch(removeCategory(id)),
    selectCategory: id => dispatch(selectCategory(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Category);
