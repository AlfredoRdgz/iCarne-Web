// Created by Alfredo Rodriguez.
// <summary>
// AdminProductsComponent will render the list of the products that are currently sold by the user.
// This component will ONLY be visible for company accounts.
// </summary>
import React, { useEffect } from 'react';
import AdminProduct from './AdminProductComponent';
import { connect } from 'react-redux';
import { loadAccountProducts } from '../redux/thunks/AccountThunks';
import { Breadcrumbs, Fab, TablePagination } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Add } from '@material-ui/icons';
import { getAccountProductDetails } from '../redux/actions/AccountActions';
import { Constants } from './Constants';
const UrlEndpoints = Constants.UrlEndpoints;

function AdminProducts({ user, products = [], isLoading, startLoadingProducts, handleSelection }) {

  // #region public properties.
  const [pageProducts, setPageProducts] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  // #region public properties.

  // #region private methods.
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    let productCount = products.length || 0;
    if (productCount > 0 && productCount < ((newPage + 1) * rowsPerPage)) {
      setPageProducts(products.slice(newPage * rowsPerPage, (newPage + 1) * productCount));
    } else if (productCount > 0) {
      setPageProducts(products.slice(newPage * rowsPerPage, (newPage + 1) * rowsPerPage));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    let newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    let productCount = products.length || 0;
    if (productCount > 0 && productCount < (1 * newRowsPerPage)) {
      setPageProducts(products.slice(0, 1 * productCount));
    } else if (productCount > 0) {
      setPageProducts(products.slice(0, 1 * newRowsPerPage));
    }
  };


  const updateInitialProducts = (products) => {
    let productCount = products.length || 0;
    if (products.length > 0 && productCount < rowsPerPage) {
      setPageProducts(products.slice(0, productCount));
    } else if (productCount > 0) {
      setPageProducts(products.slice(0, rowsPerPage));
    }
  }

  useEffect(() => {
    startLoadingProducts(user?.AccessToken, updateInitialProducts);
  }, []);

  useEffect(() => {
    updateInitialProducts(products);
  }, [products]);
  // #endregion private methods.

  // #region render.
  const loadingMessage = <div className="loader-container"><div className="loader"></div></div>

  const content =
    <div className="container p-4">

      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to={UrlEndpoints.account}>Mi cuenta </Link>
        <Link to="#" color="secondary">Mis productos</Link>
      </Breadcrumbs>

      <h1 className="text-center my-2">MIS PRODUCTOS</h1>


      <TablePagination
        className="my-2"
        component="div"
        count={products?.length || 0}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        rowsPerPageOptions={[6, 12, 24, 60]}
      />

      <ul style={{ padding: 0 }}>
        {
          pageProducts.map((product) => {
            return (
              <AdminProduct key={product.Id} product={product} />
            );
          })
        }
      </ul>

      <TablePagination
        component="div"
        count={products.length}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        rowsPerPageOptions={[6, 12, 24, 60]}
      />

      <Link className="float-action-button" to={UrlEndpoints.accountProductEdit}>
        <Fab color="secondary" aria-label="add" onClick={() => handleSelection([])}>
          <Add />
        </Fab>
      </Link>
    </div>;

  return isLoading ? loadingMessage : content;
  // #endregion render.
}

// #region redux.
const mapStateToProps = state => ({
  user: state.UserSession,
  products: state.AccountProductsList,
  isLoading: state.IsAccountProcessLoading
});

const mapDispatchToProps = dispatch => ({
  handleSelection: (product) => dispatch(getAccountProductDetails(product)),
  startLoadingProducts: (AccessToken, callback) => dispatch(loadAccountProducts(AccessToken, callback))
});
// #endregion redux.

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts);
