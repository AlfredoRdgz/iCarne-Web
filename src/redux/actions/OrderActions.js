// Created by Alfredo Rodriguez.
// <summary>
// OrderActions file contains all methods that will be sent to the reducers to update the cart and checkout related stores.
// </summary>
import Constants from '../constants/ActionConstants';

// Cart actions.
export const clearCart = () => {
    return {
        type: Constants.CLEAR_CART
    }
}

export const addToCart = (product, Amount) => {
    return {
        type: Constants.ADD_TO_CART,
        payload: {
            product: product,
            Amount: Amount
        }
    };
}

export const removeFromCart = (productId) => {
    return {
        type: Constants.REMOVE_FROM_CART,
        payload: {
            Id: productId,
        }
    };
}

export const updateCartItem = (productId, Amount) => {
    return {
        type: Constants.UPDATE_CART_ITEM,
        payload: {
            Id: productId,
            Amount: Amount
        }
    };
}

export const updateCartTotal = (cart, tipPercentage = 0) => {
    return {
        type: Constants.UPDATE_CART_TOTAL,
        payload: {
            cart: cart,
            tipPercentage: tipPercentage
        }
    };
}