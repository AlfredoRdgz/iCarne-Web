// Created by Alfredo Rodriguez.
// <summary>
// ProductReducers file contains all methods that perform changes to the product catalog related stores.
// </summary>
import Constants from "../constants/ActionConstants";

export const IsLoading = (state, action) => {
    const { type } = action;

    switch (type) {
        case Constants.LOAD_PRODUCTS_IN_PROGRESS:
        case Constants.SEARCH_PRODUCTS_IN_PROGRESS:
        case Constants.LOAD_CATEGORIES_IN_PROGRESS:
            return true;
        case Constants.SEARCH_PRODUCTS_SUCCESS:
        case Constants.SEARCH_PRODUCTS_FAILED:
        case Constants.LOAD_PRODUCTS_SUCCESS:
        case Constants.LOAD_PRODUCTS_FAILED:
        case Constants.LOAD_CATEGORIES_SUCCESS:
        case Constants.LOAD_CATEGORIES_FAILED:
        default:
            return false;
    }
}

export const ProductList = (state = [], action) => {
    const { type, payload } = action;

    switch (type) {
        case Constants.LOAD_PRODUCTS_SUCCESS: {
            const { products } = payload;
            return products;
        }
        case Constants.LOAD_PRODUCTS_IN_PROGRESS:
        case Constants.LOAD_PRODUCTS_FAILED:
        default:
            return state;
    }
};

export const ProductSearch = (state = [], action) => {
    const { type, payload } = action;

    switch (type) {
        case Constants.SEARCH_PRODUCTS_SUCCESS: {
            const { products } = payload;
            return products;
        }
        case Constants.SEARCH_PRODUCTS_IN_PROGRESS:
        case Constants.SEARCH_PRODUCTS_FAILED:
        default:
            return state;
    }
};

export const Product = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case Constants.GET_PRODUCT_DETAILS: {
            const { product } = payload;

            return product;
        }
        default:
            return state;
    }
}

export const CategoryList = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case Constants.LOAD_CATEGORIES_SUCCESS: {
            const { categories } = payload;
            return categories;
        }
        case Constants.LOAD_CATEGORIES_IN_PROGRESS:
        case Constants.LOAD_CATEGORIES_FAILED:
        default:
            return state;
    }
}

export const PreventReload = (state = false, action) => {
    const { type } = action;
    switch (type) {
        case Constants.PREVENT_RELOAD:
            return true;
        case Constants.ALLOW_RELOAD:
        default:
            return false;
    }
}