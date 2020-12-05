// Created by Alfredo Rodriguez.
// <summary>
// ActionConstants file contains the constants enum that will be implemented to identify the correct implementations to be performed by the reducers.
// </summary>
export const Constants = {
    // Product list constants.
    LOAD_PRODUCTS_IN_PROGRESS: 0,
    LOAD_PRODUCTS_SUCCESS: 1,
    LOAD_PRODUCTS_FAILED: 2,
    GET_PRODUCT_DETAILS: 3,
    SEARCH_PRODUCTS_IN_PROGRESS: 4,
    SEARCH_PRODUCTS_SUCCESS: 5,
    SEARCH_PRODUCTS_FAILED: 6,

    // Cart constants.
    ADD_TO_CART: 100,
    REMOVE_FROM_CART: 101,
    UPDATE_CART_ITEM: 102,
    UPDATE_CART_TOTAL: 103,
    CLEAR_CART: 104,

    // User account constants.
    USER_LOGIN_IN_PROGRESS: 200,
    USER_LOGIN_SUCCESS: 201,
    USER_LOGIN_FAILED: 202,
    USER_LOGOUT_IN_PROGRESS: 203,
    USER_LOGOUT_SUCCESS: 204,
    USER_LOGOUT_FAILED: 205,
    LOAD_ACCOUNT_PRODUCTS_IN_PROGRESS: 206,
    LOAD_ACCOUNT_PRODUCTS_SUCCESS: 207,
    LOAD_ACCOUNT_PRODUCTS_FAILED: 208,
    LOAD_ACCOUNT_ADDRESSES_IN_PROGRESS: 209,
    LOAD_ACCOUNT_ADDRESSES_SUCCESS: 210,
    LOAD_ACCOUNT_ADDRESSES_FAILED: 211,
    LOAD_ACCOUNT_ORDERS_IN_PROGRESS: 212,
    LOAD_ACCOUNT_ORDERS_SUCCESS: 213,
    LOAD_ACCOUNT_ORDERS_FAILED: 214,
    LOAD_ACCOUNT_CONTACT_INFORMATION_IN_PROGRESS: 215,
    LOAD_ACCOUNT_CONTACT_INFORMATION_SUCCESS: 216,
    LOAD_ACCOUNT_CONTACT_INFORMATION_FAILED: 217,
    GET_ACCOUNT_PRODUCT_DETAILS: 218,
    GET_ACCOUNT_ORDER_DETAILS: 219,

    // Categories Constants
    LOAD_CATEGORIES: 300,
    LOAD_CATEGORIES_IN_PROGRESS: 301,
    LOAD_CATEGORIES_SUCCESS: 302,
    LOAD_CATEGORIES_FAILED: 303,

    // Reload Constants
    PREVENT_RELOAD: 400,
    ALLOW_RELOAD: 401,

    // Store constants
    LOAD_STORES_IN_PROGRESS: 500,
    LOAD_STORES_SUCCESS: 501,
    LOAD_STORES_FAILED: 502,
    GET_STORE_DETAILS: 503

};

export default Constants;