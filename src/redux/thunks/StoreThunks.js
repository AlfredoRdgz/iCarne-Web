// Created by Alfredo Rodriguez.
// <summary>
// AccountThunks file contains all methods that call the server for requests and ultimately perform a task from the store actions.
// This document contains all Thunks related to account generated actions only.
// </summary>
import {
    loadStoresInProgress,
    loadStoresSuccess,
    loadStoresFailed
} from '../actions/StoreActions';

// #region private properties
const fetch = require('node-fetch');
const baseUrl = 'https://ws.carnessupremaslapaz.com';
// # endregion private properties

// Load addresses saved from the user account.
export const loadStores = () => async (dispatch, getState) => {
    dispatch(loadStoresInProgress());
    try {
        const response = await fetch(`${baseUrl}/store`);
        const result = await response.json();
        if (response.status === 200) {
            dispatch(loadStoresSuccess(result));
        } else {
            throw result.Message;
        }
    } catch (error) {
        dispatch(loadStoresFailed(error));
    }
};