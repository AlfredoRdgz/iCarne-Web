// Created by Alfredo Rodriguez.
// <summary>
// AccountReducers file contains all methods that perform changes to the account related stores.
// </summary>
import Constants from "../constants/ActionConstants";

export const IsAccountSessionLoading = (state = true, action) => {
    const { type } = action;

    switch (type) {
        case Constants.USER_LOGIN_IN_PROGRESS:
        case Constants.USER_LOGOUT_IN_PROGRESS:
            return true;
        case Constants.USER_LOGIN_SUCCESS:
        case Constants.USER_LOGIN_FAILED:
        case Constants.USER_LOGOUT_SUCCESS:
        case Constants.USER_LOGOUT_FAILED:
        default:
            return false;
    }
}

export const IsAccountProcessLoading = (state = true, action) => {
    const { type } = action;

    switch (type) {
        case Constants.LOAD_ACCOUNT_PRODUCTS_IN_PROGRESS:
        case Constants.LOAD_ACCOUNT_ADDRESSES_IN_PROGRESS:
        case Constants.LOAD_ACCOUNT_ORDERS_IN_PROGRESS:
            return true;
        case Constants.LOAD_ACCOUNT_PRODUCTS_SUCCESS:
        case Constants.LOAD_ACCOUNT_PRODUCTS_FAILED:
        case Constants.LOAD_ACCOUNT_ADDRESSES_SUCCESS:
        case Constants.LOAD_ACCOUNT_ADDRESSES_FAILED:
        case Constants.LOAD_ACCOUNT_ORDERS_SUCCESS:
        case Constants.LOAD_ACCOUNT_ORDERS_FAILED:
        default:
            return false;
    }
}

export const AccountProductsList = (state = [], action) => {
    const { type, payload } = action;

    switch (type) {
        case Constants.LOAD_ACCOUNT_PRODUCTS_SUCCESS: {
            const { products } = payload;
            return products;
        }
        case Constants.LOAD_ACCOUNT_PRODUCTS_IN_PROGRESS:
        case Constants.LOAD_ACCOUNT_PRODUCTS_FAILED:
        default:
            return state;
    }
};

export const AccountProduct = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case Constants.GET_ACCOUNT_PRODUCT_DETAILS: {
            const { product } = payload;

            return product;
        }
        default:
            return state;
    }
}

export const AccountOrdersList = (state = [], action) => {
    const { type, payload } = action;

    switch (type) {
        case Constants.LOAD_ACCOUNT_ORDERS_SUCCESS: {
            const { orders } = payload;
            return orders;
        }
        case Constants.LOAD_ACCOUNT_ORDERS_IN_PROGRESS:
        case Constants.LOAD_ACCOUNT_ORDERS_FAILED:
        default:
            return state;
    }
};

export const AccountOrder = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case Constants.GET_ACCOUNT_ORDER_DETAILS: {
            const { order } = payload;

            return order;
        }
        default:
            return state;
    }
}

export const AccountContactInformation = (state = {}, action) => {
    const { type, payload } = action;

    switch (type) {
        case Constants.LOAD_ACCOUNT_CONTACT_INFORMATION_SUCCESS: {
            const { contactInformation } = payload;
            return contactInformation;
        }
        case Constants.LOAD_ACCOUNT_CONTACT_INFORMATION_IN_PROGRESS:
        case Constants.LOAD_ACCOUNT_CONTACT_INFORMATION_FAILED:
        default:
            return state;
    }
};

export const AccountAddressesList = (state = [], action) => {
    const { type, payload } = action;

    switch (type) {
        case Constants.LOAD_ACCOUNT_ADDRESSES_SUCCESS: {
            const { addresses } = payload;
            return addresses;
        }
        case Constants.LOAD_ACCOUNT_ADDRESSES_IN_PROGRESS:
        case Constants.LOAD_ACCOUNT_ADDRESSES_FAILED:
        default:
            return state;
    }
};

export const UserSession = (state = {RefreshToken: "", AccessToken: "", IsLoggedIn: false}, action) => {
    const { type, payload } = action;
    switch (type) {
        case Constants.USER_LOGIN_SUCCESS: {
            const { credentials } = payload;
            return credentials;
        }
        case Constants.USER_LOGOUT_SUCCESS: {
            const { credentials } = payload;
            return credentials;
        }
        case Constants.USER_LOGIN_FAILED:
        case Constants.USER_LOGOUT_FAILED:
        default:
            return state;
    }
}