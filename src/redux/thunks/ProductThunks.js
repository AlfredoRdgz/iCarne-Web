// Created by Alfredo Rodriguez.
// <summary>
// SessionThunks file contains all methods that call the server for requests and ultimately perform a task from the store actions.
// This document contains all Thunks related to generic product lists.
// </summary>
import {
    searchProductsInProgress,
    searchProductsSuccess,
    searchProductsFailed,
    loadProductsInProgress,
    loadProductsSuccess,
    loadProductsFailed,
    loadCategoriesInProgress,
    loadCategoriesSuccess,
    loadCategoriesFailed
} from '../actions/ProductActions';
const fetch = require('node-fetch');
const baseUrl = 'https://ws.carnessupremaslapaz.com';

// Load a list of existing products from all companies.
export const loadProducts = (setCallback) => async (dispatch, getState) => {
    dispatch(loadProductsInProgress());
    try {
        const response = await fetch(`${baseUrl}/catalog/product`);
        const products = await response.json();
        dispatch(loadProductsSuccess(products));
        setCallback(products);
    } catch (error) {
        dispatch(loadProductsFailed());
    }
};

// Load a list of categories.
export const loadCategories = () => async (dispatch, getState) => {
    dispatch(loadCategoriesInProgress());
    try {
        const response = await fetch(`${baseUrl}/catalog/category`);
        const categories = await response.json();
        dispatch(loadCategoriesSuccess(categories));
    } catch (error) {
        dispatch(loadCategoriesFailed());
        console.log(error);
    }
};

// Load a list of products from a certain category.
export const loadProductsByCategory = (id) => async (dispatch, getState) => {
    dispatch(searchProductsInProgress());
    try {
        const response = await fetch(`${baseUrl}/catalog/product/category/` + id);
        const products = await response.json();
        dispatch(searchProductsSuccess(products));
    } catch (error) {
        dispatch(searchProductsFailed());
    }
};

// Search for a product from the search bar.
export const searchProduct = (q, callback) => async (dispatch, getState) => {
    dispatch(searchProductsInProgress());
    try {
        const response = await fetch(`${baseUrl}/catalog/product/find?q=` + encodeURI(q));
        const products = await response.json();
        dispatch(searchProductsSuccess(products));
        callback(products);
    } catch (error) {
        dispatch(searchProductsFailed());
    }
};