// Created by Alfredo Rodriguez.
// <summary>
// ProductDetailComponent will render the detailed description of the product, and will provide capabilities
// to select a number of products and add them to the cart as well as to redirect to the checkout directly.
// </summary>
import React, { useEffect } from 'react';
import { Button, Divider, Hidden } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import { connect } from 'react-redux';
import { addToCart, updateCartTotal, updateCartItem } from '../redux/actions/OrderActions';
import { addProductRating, getProductRating } from '../redux/viewmodels/Product';
import { Constants } from './Constants';
const UrlEndpoints = Constants.UrlEndpoints;

function AddedToCartTag({ inCart }) {
  return inCart ? <p style={{ color: 'red' }}>ESTE ELEMENTO YA ESTÁ EN SU CARRITO</p> : null;
}

function ProductDetail({ product, cart, addToCart, updateProduct, updateTotalPrice }) {
  // #region private properties.
  const { Id, Business, Image, Description, Price, WholesalePrice, WholesaleAmount, Name, RatingScore } = product;
  const history = useHistory();
  // #endregion private properties.

  // #region public properties.
  const [qty, setQty] = React.useState(1);
  const [rating, setRating] = React.useState(RatingScore || 0);
  // #endregion public properties.

  // #region public methods.
  const increaseQty = () => { setQty(qty + 1); }
  const decreaseQty = () => {
    if (qty > 0) {
      setQty(qty - 1);
    }
  }
  const changeQty = (event) => {
    if (Number(event.target.value) > 0) {
      setQty(Number(event.target.value));
    }
  }

  const handleAddCart = () => {
    if (!isInCart()) {
      addToCart(product, qty);
    } else {
      updateProduct(Id, qty);
    }
    history.push(UrlEndpoints.cart);
  }

  const handleBuyNow = () => {
    if (!isInCart()) {
      addToCart(product, qty);
    } else {
      updateProduct(Id, qty);
    }
    history.push(UrlEndpoints.checkout);
  }

  const uploadRating = async (rating) => {
    try {
      console.log(rating);
      await addProductRating(Id, rating);
      setRating(rating);
    } catch (error) {
      console.log(error);
      alert("Hubo un error al guardar la calificación.");
    }
  }
  // #endregion public methods.

  // #region private methods.
  const isInCart = () => {
    return cart.some((item) => {
      return item.Id === Id;
    });
  }

  useEffect(() => {
    (async function loadRating() {
      try {
        let result = await getProductRating(Id);
        if (result.RatingScore > 0) {
          setRating(result.RatingScore);
        }
      } catch (error) {
        return;
      }
    })();
  }, [product]);
  // #endregion private methods.

  // #region render.
  return (
    <div className="container p-4 paper-container">
      <div className="row  color-tertiary" style={{ borderRadius: '20px' }}>
        <div className="col-12 col-md-6" style={{ display: 'flex' }}>
          <div className="img-container img-big-container">
            <img src={Image} alt={Name} />
          </div>
        </div>

        <Hidden mdUp>
          <Divider className="m-2" />
        </Hidden>

        {/* Description box. */}
        <div className="col-12 col-md-6">
          <h2 className="bold my-4" style={{ color: 'var(--primary)' }}>{Name}</h2>
          <p style={{ fontSize: '14px' }}>Vendido por: {Business}</p>
          <AddedToCartTag inCart={isInCart()} />

          {/* Rating. */}
          <Rating
            name="rating"
            value={rating}
            precision={0.5}
            onChange={(event, newValue) => {
              uploadRating(newValue);
            }}
          />

          <h4 className="my-4" style={{ fontWeight: '200' }}>Precio menudeo: <span style={{ color: 'var(--primary)' }}>$ {Price.toFixed(2)}</span></h4>
          <h6 className="mt-4" style={{ fontWeight: '200' }}>Precio mayoreo: <span style={{ color: 'var(--primary)' }}>$ {WholesalePrice.toFixed(2)}</span></h6>
          <p className="mb-4" style={{ fontWeight: '200' }}>Artículos para mayoreo: <span style={{ color: 'var(--primary)' }}>{WholesaleAmount}</span></p>

          {/* Quantity input. */}
          <h6 style={{ margin: 'auto 0px auto 0' }}>Cantidad: </h6>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ border: '1px solid black', padding: '10px' }}>
              <span><Remove onClick={decreaseQty} /></span>
              <input className="clean-input" style={{ width: '90px', textAlign: 'center' }} type="number" min="1" value={qty} onChange={changeQty} />
              <span><Add onClick={increaseQty} /></span>
            </div>
          </div>

          {/* Action buttons. */}
          <div style={{ display: 'flex', flexDirection: 'column', margin: '20px auto' }}>
            <Button variant="contained" style={{ margin: '20px auto', width: '200px' }} color="secondary" onClick={handleAddCart}>
              Agregar al carrito
              </Button>
            <Button variant="contained" color="secondary" onClick={handleBuyNow} style={{ width: '200px', margin: 'auto', marginBottom: '10px' }}>
              Comprar ahora
                </Button>
          </div>
        </div>
      </div>

      <Divider className="m-2" />

      <div className="p-2">
        <h3>Descripción:</h3>
        <p>{Description}</p>
      </div>

      <div className="p-2">
        <h3>Vendedor:</h3>
        <p>{Business}</p>
      </div>

    </div>
  );
  // #endregion render.
}

// #region redux.
const mapStateToProps = state => ({
  product: state.Product,
  cart: state.Cart
});

const mapDispatchToProps = dispatch => ({
  addToCart: (product, amount) => dispatch(addToCart(product, amount)),
  updateProduct: (productId, amount) => dispatch(updateCartItem(productId, amount)),
  updateTotalPrice: (cart) => dispatch(updateCartTotal(cart))
});
// #endregion redux.

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);