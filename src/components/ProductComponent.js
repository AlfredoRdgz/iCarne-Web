// Created by Alfredo Rodriguez.
// <summary>
// ProductComponent will render the individual product and will provide a redirect method to open the ProductDetailComponent.
// </summary>
import React from 'react';
import { Card } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProductDetails } from '../redux/actions/ProductActions';
import { Constants } from './Constants';
const UrlEndpoints = Constants.UrlEndpoints;

function Product({ product, handleSelection }) {
  // #region private properties.
  const { Name, Image, Price, Business } = product;
  // #endregion private properties.

  // #region render.
  return (
    <li className="col-12 col-sm-6 col-lg-4" onClick={() => handleSelection(product)}>
      <Link to={UrlEndpoints.productDetail}>
        <Card className="product-list-item m-2 px-1 py-4" style={{ display: 'flex' }}>
          <div className="img-container" style={{ display: 'flex' }}>
            <img src={Image} alt={Name} style={{ height: '100px', margin: 'auto' }} />
          </div>
          <hr style={{ width: '100%', border: '1px solid rgba(128,128,128, 0.3)' }} />
          <div className="col-12">
            <h5 className="text-center">{Name}</h5>
            <p style={{ color: 'gray', margin: 0 }}>{Business}</p>
            <h5 className="color-primary">${Price.toFixed(2)}</h5>
          </div>
        </Card>
      </Link>
    </li>
  );
  // #endregion render.
}

// #region redux.
const mapDispatchToProps = dispatch => ({
  handleSelection: (product) => dispatch(getProductDetails(product))
});
// #endregion redux.

export default connect(null, mapDispatchToProps)(Product);
