// Created by Alfredo Rodriguez.
// <summary>
// CartComponent will provide a live view of the current user's cart.
// </summary>
import React, { useEffect } from 'react';
import CartProduct from './CartProductComponent';
import { Card, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { updateCartTotal } from '../redux/actions/OrderActions';
import { Link } from 'react-router-dom';
import { Constants } from './Constants';
const UrlEndpoints = Constants.UrlEndpoints;

function Cart({ cart, cartTotal, updateTotalPrice }) {
  // #region private methods.
  useEffect(() => {
    updateTotalPrice(cart);
  }, [cart]);
  // #endregion private methods.

  // #region render.
  if (cart.length > 0) {
    return (
      <div className="container paper-container">

        <h1 className="text-center my-2">ARTÍCULOS EN CARRITO</h1>

        <div className="my-2">
          {
            cart.map((product) => {
              return <CartProduct key={product.Id} product={product} editable={true} />
            })
          }
        </div>

        <Card className="mx-2 p-2 row" style={{ marginTop: 'auto', marginBottom: '20px', overflow: 'visible' }}>
          <div className="row" style={{ marginLeft: 'auto' }}>
            <div className="mx-2" style={{ margin: 'auto' }}>
              <h5>Total: </h5>
              <h5> ${cartTotal.total.toFixed(2)} </h5>
            </div>
            <div className="mx-4" style={{ display: 'flex' }}>
              <Link to={UrlEndpoints.checkout} style={{ margin: 'auto' }}>
                <Button variant="contained" color="secondary">
                  Comprar
                </Button>
              </Link>
            </div>
          </div>
        </Card>

      </div>
    );
  }
  else {
    return (
      <div className="container my-4">
        <h1 className="text-center">No hay elementos en su carrito</h1>
      </div>
    );
  };
  // #endregion render.
}

// #region redux.
const mapStateToProps = state => ({
  cart: state.Cart,
  cartTotal: state.CartTotal
});

const mapDispatchToProps = dispatch => ({
  updateTotalPrice: (cart) => dispatch(updateCartTotal(cart)),
});
// #endregion redux.

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
