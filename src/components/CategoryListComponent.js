// Created by Alfredo Rodriguez.
// <summary>
// CategoryListComponent will render the categories that exist in the application.
// </summary>
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadCategories } from '../redux/thunks/ProductThunks';
import Category from './CategoryComponent';

function CategoryList({ categoryList, isLoading, startLoadingCategories }) {

  // #region private methods.
  useEffect(() => {
    startLoadingCategories();
  }, []);
  // #endregion private methods.

  // #region render.
  const loadingMessage = <div className="loader-container"><div className="loader"></div></div>

  const content =
    <div className="container paper-container p-4">
      <h1 className="text-center w-100 m-2">CATEGORÍAS</h1>
      <ul className="product-list row">
        {
          categoryList.map((category) => {
            return (
              <Category key={category.Id} category={category} />
            );
          })
        }
      </ul>
    </div>;

  return isLoading ? loadingMessage : content;
  // #endregion render.
}

// #region redux.
const mapStateToProps = state => ({
  categoryList: state.CategoryList,
  isLoading: state.IsLoading
});

const mapDispatchToProps = dispatch => ({
  startLoadingCategories: () => dispatch(loadCategories())
});
// #endregion redux.

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
