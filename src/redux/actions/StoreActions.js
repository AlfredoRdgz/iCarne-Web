// Created by Alfredo Rodriguez.
// <summary>
// StoreActions file contains all methods that will be sent to the reducers to update the stores.
// </summary>
import Constants from '../constants/ActionConstants';

// Store actions.
export const loadStoresInProgress = () => {
    return {
        type: Constants.LOAD_STORES_IN_PROGRESS
    };
}

export const loadStoresSuccess = (stores) => {
    return {
        type: Constants.LOAD_STORES_SUCCESS,
        payload: { stores }
    };
}

export const loadStoresFailed = (error) => {
    alert(error);
    return {
        type: Constants.LOAD_STORES_FAILED
    };
}

export const getStoreDetails = (store) => {
    return {
        type: Constants.GET_STORE_DETAILS,
        payload: { store }
    }
}