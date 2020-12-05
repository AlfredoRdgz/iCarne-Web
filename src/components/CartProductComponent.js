// Created by Alfredo Rodriguez.
// <summary>
// CartProductComponent will render each product inside the cart, as well as options to add or reduce quantities or remove it from the cart.
// </summary>
import React from 'react'
import { Badge, Card, IconButton, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeFromCart, updateCartItem, updateCartTotal } from '../redux/actions/OrderActions';
import { getProductDetails } from '../redux/actions/ProductActions';
import { Constants } from './Constants';
import { Add, Remove } from '@material-ui/icons';
const UrlEndpoints = Constants.UrlEndpoints;

function CartProduct({ product, editable, cart, handleSelection, removeProduct, updateProduct, updateTotalPrice }) {
    // #region private properties.
    const history = useHistory();
    const { Image, Price, Name, Amount, Id, WholesaleAmount, WholesalePrice } = product;
    let applicablePrice = Price;
    let currentSubtotal = 0;
    // #endregion private properties.

    // #region public properties.
    const [qty, setQty] = React.useState(Amount);
    // #endregion public properties.

    // #region  private methods.
    if (Amount >= WholesaleAmount) {
        currentSubtotal = WholesalePrice * Amount;
        applicablePrice = WholesalePrice;
    } else {
        applicablePrice = Price;
        currentSubtotal = Price * Amount;
    }
    // #endregion private methods.

    // #region public methods.
    const viewProduct = () => {
        handleSelection(product)
        history.push(UrlEndpoints.productDetail);
    }

    const handleSetQty = (event) => {
        if (Number(event.target.value) > 0) {
            let newValue = Number(event.target.value);
            let changeDifference = newValue - qty;
            updateProduct(Id, changeDifference);
            setQty(event.target.value);
            updateTotalPrice(cart);
        }
    }

    const decreaseQty = () => {
        if (qty - 1 > 0) {
            let newValue = qty - 1;
            updateProduct(Id, -1);
            setQty(newValue);
            updateTotalPrice(cart);
        }
    }

    const increaseQty = () => {
        let newValue = qty + 1;
        updateProduct(Id, 1);
        setQty(newValue);
        updateTotalPrice(cart);
    }

    const handleRemoveFromCart = () => {
        removeProduct(Id);
        updateTotalPrice(cart);
    }
    // #endregion public methods.

    // #region render.
    if (editable) {
        return (
            <Card className="row p-2 mx-2 my-3">
                <div className="flex-row" onClick={viewProduct}>
                    <img src={Image} style={{ maxWidth: '75px', maxHeight: '75px' }} alt="" className="color-tertiary m-2" />
                    <div>
                        <h5 style={{ margin: '0 0 0 auto' }}> {Name} </h5>
                        <p style={{ margin: '0 0 0 auto' }}> Precio unitario: $ {applicablePrice.toFixed(2)} </p>
                        <p style={{ margin: '0 0 0 auto' }}> Subtotal: $ {currentSubtotal.toFixed(2)} </p>
                    </div>
                </div>
                <div className="flex-row">
                    <div className="row" style={{ margin: 'auto 0 auto auto' }}>
                        <div style={{ border: '1px solid black', padding: '10px' }}>
                            <span><Remove onClick={decreaseQty} /></span>
                            <input className="clean-input" style={{ width: '90px', textAlign: 'center' }} type="number" min="1" value={qty} onChange={handleSetQty} />
                            <span><Add onClick={increaseQty} /></span>
                        </div>
                        <IconButton style={{ margin: 'auto 0' }} onClick={handleRemoveFromCart}>
                            <DeleteIcon color="primary" />
                        </IconButton>
                    </div>
                </div>
            </Card>
        );
    } else {
        return (
            <Card className="p-2 m-2" style={{ boxShadow: 'none!important' }}>
                <div className="flex-row" onClick={viewProduct}>
                    <Badge badgeContent={qty} color="secondary" overlap="circle" max={999}>
                        <img src={Image} style={{ maxWidth: '75px', maxHeight: '75px' }} alt="" className="color-tertiary m-2" />
                    </Badge>
                    <div style={{ margin: 'auto' }}>
                        <p> {Name} </p>
                        <p> Subtotal: ${currentSubtotal.toFixed(2)} </p>
                    </div>
                </div>
            </Card>
        );
    }
    // #endregion render.
}

// #region redux.
const mapStateToProps = (state, ownProps) => ({
    key: ownProps.key,
    product: ownProps.product,
    editable: ownProps.editable,
    cart: state.Cart
});

const mapDispatchToProps = dispatch => ({
    handleSelection: (product) => dispatch(getProductDetails(product)),
    removeProduct: (productId) => dispatch(removeFromCart(productId)),
    updateProduct: (productId, Amount) => dispatch(updateCartItem(productId, Amount)),
    updateTotalPrice: (cart) => dispatch(updateCartTotal(cart)),
});
// #endregion redux.

export default connect(mapStateToProps, mapDispatchToProps)(CartProduct);