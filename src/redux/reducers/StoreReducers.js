// Created by Alfredo Rodriguez.
// <summary>
// StoreReducers file contains all methods that perform changes to the stores.
// </summary>
import Constants from "../constants/ActionConstants";

export const StoreList = (state = [], action) => {
    const { type, payload } = action;

    switch (type) {
        case Constants.LOAD_STORES_SUCCESS: {
            const { stores } = payload;
            return stores;
        }
        case Constants.LOAD_STORES_IN_PROGRESS:
        case Constants.LOAD_STORES_FAILED:
        default:
            return state;
    }
};

export const SelectedStore = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case Constants.GET_STORE_DETAILS: {
            const { store } = payload;
            return store;
        }
        default:
            return state;
    }
}