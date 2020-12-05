// Created by Alfredo Rodriguez.
// <summary>
// Store file contains all the reducers that will be required to keep the different stored values that will interact with the application.
// </summary>
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { Product, CategoryList, ProductList, ProductSearch, IsLoading, PreventReload } from './reducers/ProductReducers';
import { Cart, CartTotal } from './reducers/OrderReducers';
import { IsAccountSessionLoading, IsAccountProcessLoading, AccountOrdersList, AccountOrder, AccountProductsList, AccountProduct, AccountContactInformation, AccountAddressesList, UserSession } from './reducers/AccountReducers';
import { StoreList, SelectedStore } from './reducers/StoreReducers';
import thunk from 'redux-thunk';

const reducers = {
    ProductList,
    ProductSearch,
    CategoryList,
    Product,
    Cart,
    CartTotal,
    IsLoading,
    IsAccountSessionLoading,
    IsAccountProcessLoading,
    PreventReload,
    UserSession,
    AccountProductsList,
    AccountProduct,
    AccountAddressesList,
    AccountContactInformation,
    AccountOrdersList,
    AccountOrder,
    StoreList,
    SelectedStore
};

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
};

const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const configureStore = () => createStore(persistedReducer, applyMiddleware(thunk));