// Created by Alfredo Rodriguez.
// <summary>
// AdminProductComponent will render the individual product and will provide a redirect method to open the AdminProductEditComponent.
// </summary>
import React from 'react';
import { Card, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAccountProductDetails } from '../redux/actions/AccountActions';
import { Create, Delete } from '@material-ui/icons';
import { loadAccountProducts } from '../redux/thunks/AccountThunks';
import { deleteAccountProduct } from '../redux/viewmodels/Account';
import { getProductDetails } from '../redux/actions/ProductActions';
import { Constants } from './Constants';
import { loadProducts } from '../redux/thunks/ProductThunks';
const UrlEndpoints = Constants.UrlEndpoints;

function AdminProduct({ user, product, redirectToProduct, handleSelection, reloadAccountProducts, reloadProducts }) {
  // #region private properties.
  const { Id, Name, Image, Price } = product;
  // #endregion private properties.

  // #region public methods.
  const deleteProduct = async () => {
    try {
      await deleteAccountProduct(user?.AccessToken, Id);
      reloadAccountProducts(user?.AccessToken);
      reloadProducts();
    } catch (error) {
      alert(error);
    }
  }
  // #endregion public methods.

  // #region render.
  return (
    <li className="col-12 my-2 product-list">
      <Card className="row">
        <div className="col-10" onClick={() => redirectToProduct(product)}>
          <Link className="row" to={UrlEndpoints.productDetail}>
            <div className="col-6 col-sm-5 flex" style={{ maxWidth: '150px' }}>
              <img src={Image} style={{ maxWidth: '100%', maxHeight: '75px', margin: 'auto' }} alt="" />
            </div>
            <div className="col-6 col-sm-7 p-4">
              <h3 style={{ margin: 'auto' }}> {Name} </h3>
              <h5 className="color-primary">${Price.toFixed(2)}</h5>
            </div>
          </Link>
        </div>
        <div className="col-2 flex">
          <Link to={UrlEndpoints.accountProductEdit} style={{ margin: 'auto' }}>
            <IconButton onClick={() => handleSelection(product)}>
              <Create />
            </IconButton>
          </Link>
          <IconButton onClick={deleteProduct} style={{ margin: 'auto' }}>
            <Delete />
          </IconButton>
        </div>
      </Card>
    </li>
  );
  // #endregion render.
}

// #region redux.
const mapStateToProps = (state, ownProps) => ({
  user: state.UserSession,
  product: ownProps.product
});

const mapDispatchToProps = dispatch => ({
  redirectToProduct: (product) => dispatch(getProductDetails(product)),
  handleSelection: (product) => dispatch(getAccountProductDetails(product)),
  reloadAccountProducts: (accessToken) => dispatch(loadAccountProducts(accessToken)),
  reloadProducts: () => dispatch(loadProducts())
});
// #endregion redux.

export default connect(mapStateToProps, mapDispatchToProps)(AdminProduct);
