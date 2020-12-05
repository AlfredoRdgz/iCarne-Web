// Created by Alfredo Rodriguez.
// <summary>
// AdminStoresComponent will render the list of the current stores.
// This component will ONLY be visible for company accounts.
// </summary>
import React, { useEffect } from 'react';
import AdminStore from './AdminStoreComponent';
import { connect } from 'react-redux';
import { Breadcrumbs, Fab, TablePagination } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Add } from '@material-ui/icons';
import { Constants } from './Constants';
import { loadStores } from '../redux/thunks/StoreThunks';
import { getStoreDetails } from '../redux/actions/StoreActions';
const UrlEndpoints = Constants.UrlEndpoints;

function AdminStores({ stores = [], startLoadingStores, handleSelection }) {

  // #region public properties.
  const [pageStores, setPageStores] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  // #region public properties.

  // #region private methods.
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    let storeCount = stores.length || 0;
    if (storeCount > 0 && storeCount < ((newPage + 1) * rowsPerPage)) {
      setPageStores(stores.slice(newPage * rowsPerPage, (newPage + 1) * storeCount));
    } else if (storeCount > 0) {
      setPageStores(stores.slice(newPage * rowsPerPage, (newPage + 1) * rowsPerPage));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    let newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    let storeCount = stores.length || 0;
    if (storeCount > 0 && storeCount < (1 * newRowsPerPage)) {
      setPageStores(stores.slice(0, 1 * storeCount));
    } else if (storeCount > 0) {
      setPageStores(stores.slice(0, 1 * newRowsPerPage));
    }
  };


  const updateInitialStores = (stores) => {
    let storeCount = stores.length || 0;
    if (stores.length > 0 && storeCount < rowsPerPage) {
      setPageStores(stores.slice(0, storeCount));
    } else if (storeCount > 0) {
      setPageStores(stores.slice(0, rowsPerPage));
    }
  }

  useEffect(() => {
    startLoadingStores();
  }, []);

  useEffect(() => {
    updateInitialStores(stores);
  }, [stores]);
  // #endregion private methods.

  // #region render.
  return (
    <div className="container p-4">

      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to={UrlEndpoints.account}>Mi cuenta </Link>
        <Link to="#" color="secondary">Mis sucursales</Link>
      </Breadcrumbs>

      <h1 className="text-center my-2">MIS SUCURSALES</h1>


      <TablePagination
        className="my-2"
        component="div"
        count={stores?.length || 0}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        rowsPerPageOptions={[6, 12, 24, 60]}
      />

      <ul style={{ padding: 0 }}>
        {
          pageStores.map((store) => {
            return (
              <AdminStore key={store.Id} store={store} />
            );
          })
        }
      </ul>

      <TablePagination
        component="div"
        count={stores.length}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        rowsPerPageOptions={[6, 12, 24, 60]}
      />

      <Link className="float-action-button" to={UrlEndpoints.accountStoreEdit}>
        <Fab color="secondary" aria-label="add" onClick={() => handleSelection([])}>
          <Add />
        </Fab>
      </Link>
    </div>
  );
  // #endregion render.
}

// #region redux.
const mapStateToProps = state => ({
  stores: state.StoreList
});

const mapDispatchToProps = dispatch => ({
  handleSelection: (store) => dispatch(getStoreDetails(store)),
  startLoadingStores: () => dispatch(loadStores())
});
// #endregion redux.

export default connect(mapStateToProps, mapDispatchToProps)(AdminStores);
