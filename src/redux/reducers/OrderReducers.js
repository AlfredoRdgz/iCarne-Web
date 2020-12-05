// Created by Alfredo Rodriguez.
// <summary>
// OrderReducers file contains all methods that perform changes to the cart and checkout related stores.
// </summary>
import Constants from "../constants/ActionConstants";

export const Cart = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case Constants.ADD_TO_CART: {
            const { product, Amount } = payload;
            product.Amount = Amount;
            return state.concat(product);
        }
        case Constants.REMOVE_FROM_CART: {
            const { Id } = payload;
            return state.filter(currentProduct => currentProduct.Id !== Id);
        }
        case Constants.UPDATE_CART_ITEM: {
            const { Id, Amount } = payload;
            const newState = [...state];
            // Find and update Amount
            for (let i = 0; i < newState.length; i++) {
                if (!newState[i].Amount) {
                    newState[i].Amount = 0;
                }
                if (newState[i].Id === Id) {
                    newState[i].Amount += Amount;
                }
            }
            return newState;
        }
        case Constants.CLEAR_CART: {
            return [];
        }
        default:
            return state;
    }
}

export const CartTotal = (state = { subtotal: 0, tipPercentage: 0, total: 0 }, action) => {
    const { type, payload } = action;
    switch (type) {
        case Constants.UPDATE_CART_TOTAL: {
            const { cart, tipPercentage } = payload;

            let newState = {};

            let newSubtotal = 0;
            for (let i = 0; i < cart.length; i++) {
                let currentSubtotal = 0;
                if (cart[i].Amount >= cart[i].WholesaleAmount) {
                    currentSubtotal = cart[i].WholesalePrice * cart[i].Amount;
                } else {
                    currentSubtotal = cart[i].Price * cart[i].Amount;
                }
                newSubtotal += currentSubtotal;
            }

            newState.subtotal = newSubtotal;
            newState.tipPercentage = tipPercentage;
            let tip = newSubtotal * tipPercentage;
            newState.total = newSubtotal + tip;

            return newState;
        }
        case Constants.CLEAR_CART: {
            return { subtotal: 0, tipPercentage: 0, total: 0 };
        }
        default:
            return state;
    }
}