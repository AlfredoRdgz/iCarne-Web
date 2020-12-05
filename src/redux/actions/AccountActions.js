// Created by Alfredo Rodriguez.
// <summary>
// AccountActions file contains all methods that will be sent to the reducers to update the account related stores.
// </summary>
import Constants from '../constants/ActionConstants';

// Account products actions.
export const loadAccountProductsInProgress = () => {
    return {
        type: Constants.LOAD_ACCOUNT_PRODUCTS_IN_PROGRESS
    };
}

export const loadAccountProductsSuccess = (products) => {
    return {
        type: Constants.LOAD_ACCOUNT_PRODUCTS_SUCCESS,
        payload: { products }
    };
}

export const loadAccountProductsFailed = (error) => {
    alert(error);
    return {
        type: Constants.LOAD_ACCOUNT_PRODUCTS_FAILED
    };
}
// Account contact contact information.
export const loadAccountContactInformationInProgress = () => {
    return {
        type: Constants.LOAD_ACCOUNT_CONTACT_INFORMATION_IN_PROGRESS
    };
}

export const loadAccountContactInformationSuccess = (contactInformation) => {
    return {
        type: Constants.LOAD_ACCOUNT_CONTACT_INFORMATION_SUCCESS,
        payload: { contactInformation }
    };
}

export const loadAccountContactInformationFailed = (error) => {
    alert(error);
    return {
        type: Constants.LOAD_ACCOUNT_CONTACT_INFORMATION_FAILED
    };
}

// Account addresses actions.
export const loadAccountAddressesInProgress = () => {
    return {
        type: Constants.LOAD_ACCOUNT_ADDRESSES_IN_PROGRESS
    };
}

export const loadAccountAddressesSuccess = (addresses) => {
    return {
        type: Constants.LOAD_ACCOUNT_ADDRESSES_SUCCESS,
        payload: { addresses }
    };
}

export const loadAccountAddressesFailed = (error) => {
    alert(error);
    return {
        type: Constants.LOAD_ACCOUNT_ADDRESSES_FAILED
    };
}

// Account payment options actions.
export const loadAccountPaymentOptionsInProgress = () => {
    return {
        type: Constants.LOAD_ACCOUNT_PAYMENT_OPTIONS_IN_PROGRESS
    };
}

export const loadAccountPaymentOptionsSuccess = (paymentOptions) => {
    return {
        type: Constants.LOAD_ACCOUNT_PAYMENT_OPTIONS_SUCCESS,
        payload: { paymentOptions }
    };
}

export const loadAccountPaymentOptionsFailed = (error) => {
    alert(error);
    return {
        type: Constants.LOAD_ACCOUNT_PAYMENT_OPTIONS_FAILED
    };
}

// User session actions.
export const loginInProgress = () => {
    return {
        type: Constants.USER_LOGIN_IN_PROGRESS
    };
}

export const loginSuccess = (credentials) => {
    return {
        type: Constants.USER_LOGIN_SUCCESS,
        payload: { credentials }
    };
}

export const loginFailed = (error) => {
    alert(error);
    return {
        type: Constants.USER_LOGIN_FAILED
    };
}

export const logoutInProgress = () => {
    return {
        type: Constants.USER_LOGOUT_IN_PROGRESS
    };
}

export const logoutSuccess = (credentials) => {
    return {
        type: Constants.USER_LOGOUT_SUCCESS,
        payload: { credentials }
    };
}

export const logoutFailed = (error) => {
    alert(error);
    return {
        type: Constants.USER_LOGOUT_FAILED
    };
}

// Admin product actions.
export const getAccountProductDetails = (product) => {
    return {
        type: Constants.GET_ACCOUNT_PRODUCT_DETAILS,
        payload: { product }
    }
}

// Account orders.
export const loadAccountOrdersInProgress = () => {
    return {
        type: Constants.LOAD_ACCOUNT_ORDERS_IN_PROGRESS
    };
}

export const loadAccountOrdersSuccess = (orders) => {
    return {
        type: Constants.LOAD_ACCOUNT_ORDERS_SUCCESS,
        payload: { orders }
    };
}

export const loadAccountOrdersFailed = (error) => {
    alert(error);
    return {
        type: Constants.LOAD_ACCOUNT_ORDERS_FAILED
    };
}

export const loadAccountOrderDetail = (order) => {
    return {
        type: Constants.GET_ACCOUNT_ORDER_DETAILS,
        payload: { order }
    }
}
