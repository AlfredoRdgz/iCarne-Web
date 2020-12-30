// Created by Alfredo Rodriguez.
// <summary>
// ProductActions file contains all methods that will be sent to the reducers to update the product catalog related stores.
// </summary>
import Constants from '../constants/ActionConstants';

// Product List actions.
export const loadProductsInProgress = () => {
    return {
        type: Constants.LOAD_PRODUCTS_IN_PROGRESS
    };
}

export const loadProductsSuccess = (products) => {
    return {
        type: Constants.LOAD_PRODUCTS_SUCCESS,
        payload: { products }
    };
}

export const loadProductsFailed = () => {
    return {
        type: Constants.LOAD_PRODUCTS_FAILED
    };
}

// Product Search actions.
export const searchProductsInProgress = () => {
    return {
        type: Constants.SEARCH_PRODUCTS_IN_PROGRESS
    };
}

export const searchProductsSuccess = (products) => {
    return {
        type: Constants.SEARCH_PRODUCTS_SUCCESS,
        payload: { products }
    };
}

export const searchProductsFailed = () => {
    return {
        type: Constants.SEARCH_PRODUCTS_FAILED
    };
}

// Category Actions.
export const loadCategoriesInProgress = () => {
    return {
        type: Constants.LOAD_CATEGORIES_IN_PROGRESS
    };
}

export const loadCategoriesSuccess = (categories) => {
    return {
        type: Constants.LOAD_CATEGORIES_SUCCESS,
        payload: { categories }
    };
}

export const loadCategoriesFailed = (error) => {
    alert(error);
    return {
        type: Constants.LOAD_CATEGORIES_FAILED
    };
}

// Product detail actions.
export const getProductDetails = (product) => {
    return {
        type: Constants.GET_PRODUCT_DETAILS,
        payload: { product }
    }
}

// Reload prevent and allow actions.

export const preventReload = () => {
    return {
        type: Constants.PREVENT_RELOAD
    }
}

export const allowReload = () => {
    return {
        type: Constants.ALLOW_RELOAD
    }
}