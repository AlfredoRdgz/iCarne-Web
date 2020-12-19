// Created by Alfredo Rodriguez.
// <summary>
// AccountThunks file contains all methods that call the server for requests and ultimately perform a task from the store actions.
// This document contains all Thunks related to account generated actions only.
// </summary>
import {
    loadAccountProductsInProgress,
    loadAccountProductsSuccess,
    loadAccountProductsFailed,
    loadAccountAddressesInProgress,
    loadAccountAddressesSuccess,
    loadAccountAddressesFailed,
    loadAccountContactInformationInProgress,
    loadAccountContactInformationSuccess,
    loadAccountContactInformationFailed,
    loginInProgress,
    loginSuccess,
    loginFailed,
    logoutInProgress,
    logoutSuccess,
    logoutFailed,
    loadAccountOrdersInProgress,
    loadAccountOrdersFailed,
    loadAccountOrdersSuccess,
    loadAccountOrderDetail
} from '../actions/AccountActions';

// #region private properties
const fetch = require('node-fetch');
const clientId = 1;
const baseUrl = 'https://ws.carnessupremaslapaz.com';
// # endregion private properties

// Load products from a company user account.
export const loadAccountProducts = (accessToken) => async (dispatch, getState) => {
    dispatch(loadAccountProductsInProgress());
    try {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'ClientId': clientId
            },
        }
        const response = await fetch(`${baseUrl}/admin/product`, options);
        const products = await response.json();
        dispatch(loadAccountProductsSuccess(products));
    } catch (error) {
        dispatch(loadAccountProductsFailed());
    }
};

// Load orders from a user account.
export const loadAccountOrders = (user) => async (dispatch, getState) => {
    dispatch(loadAccountOrdersInProgress());
    try {
        const accessToken = user.AccessToken;
        const options = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${accessToken}`, 'ClientId': clientId },
        }
        let response;
        if (user.IsAdmin) {
            response = await fetch(`${baseUrl}/order`, options);
        } else {
            response = await fetch(`${baseUrl}/account/order`, options);
        }
        const orders = await response.json();
        dispatch(loadAccountOrdersSuccess(orders));
    } catch (error) {
        dispatch(loadAccountOrdersFailed(error));
    }
};


// Load orders from a user account.
export const getAccountOrderDetail = (accessToken, orderId) => async (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
        dispatch(loadAccountOrdersInProgress());
        try {
            const options = {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${accessToken}`, 'ClientId': clientId }
            }
            const response = await fetch(`${baseUrl}/order/${orderId}`, options);
            const orderDetail = await response.json();
            dispatch(loadAccountOrderDetail(orderDetail));
            resolve();
        } catch (error) {
            dispatch(loadAccountOrdersFailed(error));
            reject();
        }
    });
};


export const loadAccountContactInformation = (accessToken) => async (dispatch, getState) => {
    dispatch(loadAccountContactInformationInProgress());
    try {
        const options = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${accessToken}`, 'ClientId': clientId },
        }
        const response = await fetch(`${baseUrl}/account/contact`, options);
        const result = await response.json();
        if (response.status === 200) {
            dispatch(loadAccountContactInformationSuccess(result));
        } else {
            dispatch(loadAccountContactInformationFailed(result.Message));
        }
    } catch (error) {
        dispatch(loadAccountContactInformationFailed());
    }
};

// Load addresses saved from the user account.
export const loadAccountAddresses = (accessToken) => async (dispatch, getState) => {
    dispatch(loadAccountAddressesInProgress());
    try {
        const options = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${accessToken}`, 'ClientId': clientId },
        }
        const response = await fetch(`${baseUrl}/account/address`, options);
        const result = await response.json();
        if (response.status === 200) {
            dispatch(loadAccountAddressesSuccess(result));
        } else {
            dispatch(loadAccountAddressesFailed(result.Message));
        }
    } catch (error) {
        dispatch(loadAccountAddressesFailed());
    }
};

export const validateUserSession = (userSession) => async (dispatch, getState) => {
    try {
        dispatch(loginInProgress());
        if (userSession?.AccessToken && userSession?.RefreshToken) {
            const options = {
                method: 'POST',
                headers: { 'ClientId': clientId, 'Content-Type': 'application/json' },
                body: JSON.stringify({ accessToken: userSession.AccessToken, refreshToken: userSession.RefreshToken })
            }
            const response = await fetch(`${baseUrl}/auth/token`, options);
            let result = await response.json();
            if (response.status === 201) {
                result.IsLoggedIn = true;
                dispatch(loginSuccess(result));
                return;
            }
        }
        const credentials = { RefreshToken: ``, AccessToken: ``, IsLoggedIn: false }
        dispatch(logoutSuccess(credentials));
    } catch (error) {
        const credentials = { RefreshToken: ``, AccessToken: ``, IsLoggedIn: false }
        dispatch(logoutSuccess(credentials));
    }

}

// Sign up user with the credentials provided.
export const registerUser = (name, surname, email, password) => async (dispatch, getState) => {
    dispatch(loginInProgress());
    try {
        const options = {
            method: 'POST',
            headers: { 'ClientId': clientId, 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, surname: surname, email: email, password: password }),
        }
        const response = await fetch(`${baseUrl}/auth/register/user`, options);
        let result = await response.json();
        if (response.status === 201) {
            result.IsLoggedIn = true;
            dispatch(loginSuccess(result));
        } else {
            dispatch(loginFailed(result.Message));
        }
    } catch (error) {
        dispatch(loginFailed(error));
    }
};

// Sign up company with the credentials provided.
export const registerCompany = (companyName, rfc, email, phone, password) => async (dispatch, getState) => {
    dispatch(loginInProgress());
    try {
        const options = {
            method: 'POST',
            headers: { 'ClientId': clientId, 'Content-Type': 'application/json' },
            body: JSON.stringify({ companyName: companyName, rfc: rfc, email: email, phone: phone, password: password}),
        }
        const response = await fetch(`${baseUrl}/auth/register/company`, options);
        let result = await response.json();
        if (response.status === 201) {
            result.IsLoggedIn = true;
            dispatch(loginSuccess(result));
        } else {
            dispatch(loginFailed(result.Message));
        }
    } catch (error) {
        dispatch(loginFailed(error));
    }
};

// Login user with the credentials provided.
export const loginUser = (email, password) => async (dispatch, getState) => {
    dispatch(loginInProgress());
    try {
        const options = {
            method: 'POST',
            headers: { 'ClientId': clientId, 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password }),
        }
        const response = await fetch(`${baseUrl}/auth/login`, options);
        let result = await response.json();
        if (response.status === 201) {
            result.IsLoggedIn = true;
            dispatch(loginSuccess(result));
        } else {
            dispatch(loginFailed(result.Message));
        }
    } catch (error) {
        dispatch(loginFailed(error));
    }
};

// Logout current user.
export const logoutUser = (accessToken) => async (dispatch, getState) => {
    if (accessToken) {
        dispatch(logoutInProgress());
        try {
            const options = {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${accessToken}`, 'ClientId': clientId },
            }
            const response = await fetch(`${baseUrl}/auth/logout`, options);
            const result = await response.json();
            if (response.status === 200 || response.status === 401) {
                const credentials = { RefreshToken: ``, AccessToken: ``, IsLoggedIn: false }
                dispatch(logoutSuccess(credentials));
            } else {
                dispatch(logoutFailed(result.Message));
            }
        } catch (error) {
            dispatch(logoutFailed(error));
        }
    } else {
        const credentials = { RefreshToken: ``, AccessToken: ``, IsLoggedIn: false }
        dispatch(logoutSuccess(credentials));
    }
};