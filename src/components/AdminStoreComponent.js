// Created by Alfredo Rodriguez.
// <summary>
// AdminStoreComponent will render the individual store and will provide a redirect method to open the AdminStoreEditComponent.
// </summary>
import React from 'react';
import { Card, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Create, Delete } from '@material-ui/icons';
import { deleteStore } from '../redux/viewmodels/Store';
import { Constants } from './Constants';
import { loadStores } from '../redux/thunks/StoreThunks';
import { getStoreDetails } from '../redux/actions/StoreActions';
const UrlEndpoints = Constants.UrlEndpoints;

function AdminStore({ user, store, handleSelection, reloadStores }) {
  // #region private properties.
  const { Id, Name } = store;
  // #endregion private properties.

  // #region public methods.
  const deleteSelected = async () => {
    try {
      await deleteStore(user?.AccessToken, Id);
      reloadStores();
    } catch (error) {
      alert(error);
    }
  }
  // #endregion public methods.

  // #region render.
  return (
    <li className="col-12 my-2 product-list">
      <Card className="row">
        <div className="col-10">
          <div className="col-6 col-sm-7 p-4">
            <h3 style={{ margin: 'auto' }}> {Name} </h3>
          </div>
        </div>
        <div className="col-2 flex">
          <Link to={UrlEndpoints.accountStoreEdit} style={{ margin: 'auto' }}>
            <IconButton onClick={() => handleSelection(store)}>
              <Create />
            </IconButton>
          </Link>
          <IconButton onClick={deleteSelected} style={{ margin: 'auto' }}>
            <Delete />
          </IconButton>
        </div>
      </Card>
    </li>
  );
  // #endregion render.
}

// #region redux.
const mapStateToProps = (state, ownProps) => ({
  user: state.UserSession,
  store: ownProps.store
});

const mapDispatchToProps = dispatch => ({
  handleSelection: (store) => dispatch(getStoreDetails(store)),
  reloadStores: () => dispatch(loadStores())
});
// #endregion redux.

export default connect(mapStateToProps, mapDispatchToProps)(AdminStore);
