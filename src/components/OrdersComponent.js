// Created by Alfredo Rodriguez.
// <summary>
// OrdersComponent will render the list of orders as well as allow to redirect to the detail of a specific order.
// </summary>
import React, { useEffect } from 'react';
import { Breadcrumbs, Button, Checkbox, Drawer, FormControl, FormControlLabel, FormGroup, Grid, Hidden, IconButton, Select, TablePagination, Typography } from '@material-ui/core';
import OrderDescription from './OrderDescriptionComponent';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadAccountOrders } from '../redux/thunks/AccountThunks';
import { loadStores } from '../redux/thunks/StoreThunks';
import { CloseOutlined, Tune } from '@material-ui/icons';
import { Constants } from './Constants';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
registerLocale("es", es);
const UrlEndpoints = Constants.UrlEndpoints;

function Orders({ user, orders, stores, loadStores, startLoadingOrders }) {
  // #region private properties.
  const { DeliveryType } = Constants;
  // #endregion private properties.

  // #region public properties.
  const [openFilter, setOpenFilter] = React.useState(false);
  const [filterDate, setFilterDate] = React.useState(null);
  const [storeList, setStoreList] = React.useState(stores || []);
  const [checkedSet, setCheckedSet] = React.useState(new Set());
  const [retrievedOrders, setRetrievedOrders] = React.useState([]);
  const [selectedSort, setSelectedSort] = React.useState("DESC");
  const [filteredOrders, setFilteredOrders] = React.useState([]);
  const [pageOrders, setPageOrders] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const [isEmpty, setIsEmpty] = React.useState(true);
  // #endregion public properties.

  // #region public methods.
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    let orderCount = filteredOrders.length || 0;
    if (orderCount > 0 && orderCount < ((newPage + 1) * rowsPerPage)) {
      setPageOrders(filteredOrders.slice(newPage * rowsPerPage, (newPage + 1) * orderCount));
    } else if (orderCount > 0) {
      setPageOrders(filteredOrders.slice(newPage * rowsPerPage, (newPage + 1) * rowsPerPage));
    }
    else {
      setPageOrders([]);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    let newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    let orderCount = filteredOrders.length || 0;
    if (orderCount > 0 && orderCount < (1 * newRowsPerPage)) {
      setPageOrders(filteredOrders.slice(0, 1 * orderCount));
    } else if (orderCount > 0) {
      setPageOrders(filteredOrders.slice(0, 1 * newRowsPerPage));
    }
  };


  const sortProducts = (event) => {
    let selectedOption = event.target.value;
    setSelectedSort(selectedOption);
    const asc = selectedOption === "ASC";
    let newOrders = [...filteredOrders];
    newOrders.sort((a, b) => {
      const aDate = new Date(a.DeliveryDate).getTime();
      const bDate = new Date(b.DeliveryDate).getTime();
      if (aDate < bDate) {
        return asc ? 1 : -1;
      } else if (bDate < aDate) {
        return asc ? -1 : 1;
      }
      return 0;
    });
    setFilteredOrders(newOrders);
  }

  const filterOrders = () => {
    let newOrders = retrievedOrders.filter(order => {
      if (checkedSet.size > 0) {
        if (checkedSet.has("Date")) {
          const date = new Date(order.DeliveryDate);
          if (date.getDate() !== filterDate.getDate() ||
            date.getMonth() + 1 !== filterDate.getMonth() + 1 ||
            date.getFullYear() !== filterDate.getFullYear()) {
            return false;
          }
        }
        if (!checkedSet.has("Date") || checkedSet.size > 1) {
          if (order.DeliveryTypeId === Number(DeliveryType.DELIVERY)) {
            return checkedSet.has("Delivery");
          } else {
            return checkedSet.has(order.StoreName);
          }
        }
        return true;
      } else {
        return true;
      }
    });
    setIsEmpty(newOrders.length === 0);
    setFilteredOrders(newOrders);
  }

  const updateFilterDate = (date) => {
    setFilterDate(date);
    if (date) {
      let newSet = new Set(checkedSet);
      newSet.add("Date");
      setCheckedSet(newSet);
    } else {
      let newSet = new Set(checkedSet);
      newSet.delete("Date");
      setCheckedSet(newSet);
    }
  }

  const updateFilterOption = (event) => {
    let newSet = new Set(checkedSet);
    const searchName = event.target.name;
    if (newSet.has(searchName)) {
      newSet.delete(searchName);
    } else {
      newSet.add(searchName);
    }
    setCheckedSet(newSet);
  };

  const toggleOpenFilter = () => {
    let isOpen = openFilter;
    setOpenFilter(!isOpen);
  }
  // #endregion public methods.


  // #region private methods.
  const updateInitialOrders = (resultOrders) => {
    setRetrievedOrders(resultOrders);
    setFilteredOrders(resultOrders);
    setIsEmpty(resultOrders.length === 0);

    let orderCount = resultOrders.length || 0;
    if (resultOrders.length > 0 && orderCount < rowsPerPage) {
      setPageOrders(resultOrders.slice(0, orderCount));
    } else if (orderCount > 0) {
      setPageOrders(resultOrders.slice(0, rowsPerPage));
    }
  }

  useEffect(() => {
    startLoadingOrders(user);
    if (stores.length === 0) {
      loadStores();
    }
  }, []);

  useEffect(() => {
    setStoreList(stores);
  }, [stores]);

  useEffect(() => {
    updateInitialOrders(orders);
  }, [orders]);

  useEffect(() => {
    filterOrders();
  }, [checkedSet, filterDate]);

  useEffect(() => {
    handleChangePage(null, 0);
  }, [filteredOrders]);
  // #region private methods.

  // #region render.
  return (
    <div className="p-4 container" style={{ borderRadius: '20px' }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to={UrlEndpoints.account}>
          Mi cuenta
        </Link>
        <Link to="#" color="secondary">
          Órdenes
        </Link>
      </Breadcrumbs>

      <h1 className="text-center">Mis órdenes</h1>

      <Hidden mdUp>
        <Drawer id="filterDrawer" anchor="bottom" open={openFilter} onClose={toggleOpenFilter}>
          <div className="p-4">
            <IconButton onClick={toggleOpenFilter}>
              <CloseOutlined />
            </IconButton>
            <p style={{ fontWeight: 'bold' }}>Ordenar por:</p>
            <FormControl variant="outlined" className="my-2">
              <Select
                native
                id="sort-select"
                value={selectedSort}
                onChange={sortProducts}
              >
                <option key="DESC" value="DESC">Fecha DESC</option>
                <option key="ASC" value="ASC">Fecha ASC</option>
              </Select>
            </FormControl>

            <p style={{ fontWeight: 'bold' }}>Filtrar por:</p>
            <Typography>Fecha:</Typography>
            <DatePicker
              selected={filterDate}
              onChange={updateFilterDate}
              placeholderText="Elegir fecha"
              dateFormat="dd/MM/yyyy"
              locale="es"
              className="my-2"
            />
            <Typography>Tienda:</Typography>
            <FormGroup>
              {
                storeList.map(store => {
                  return (
                    <FormControlLabel
                      key={store.Name}
                      control={<Checkbox checked={checkedSet.has(store.Name)} onChange={updateFilterOption} name={store.Name} />}
                      label={store.Name}
                    />
                  );
                })
              }
              <FormControlLabel
                key="DELIVERY"
                control={<Checkbox checked={checkedSet.has("Delivery")} onChange={updateFilterOption} name="Delivery" />}
                label="Servicio a domicilio"
              />
            </FormGroup>
          </div>
        </Drawer>
      </Hidden>


      <div className="row">
        <Hidden smDown>
          <Grid item md={2} className="my-2">
            <p style={{ fontWeight: 'bold' }}>Ordenar por:</p>
            <FormControl variant="outlined" className="my-2">
              <Select
                native
                id="sort-select"
                value={selectedSort}
                onChange={sortProducts}
              >
                <option key="DESC" value="DESC">Fecha DESC</option>
                <option key="ASC" value="ASC">Fecha ASC</option>
              </Select>
            </FormControl>

            <p style={{ fontWeight: 'bold' }}>Filtrar por:</p>
            <Typography>Fecha:</Typography>
            <DatePicker
              selected={filterDate}
              onChange={updateFilterDate}
              placeholderText="Elegir fecha"
              dateFormat="dd/MM/yyyy"
              locale="es"
              className="my-2 small-picker"
            />
            <Typography>Tienda:</Typography>
            <FormGroup>
              {
                storeList.map(store => {
                  return (
                    <FormControlLabel
                      key={store.Name}
                      control={<Checkbox checked={checkedSet.has(store.Name)} onChange={updateFilterOption} name={store.Name} />}
                      label={store.Name}
                    />
                  );
                })
              }
              <FormControlLabel
                key="DELIVERY"
                control={<Checkbox checked={checkedSet.has("Delivery")} onChange={updateFilterOption} name="Delivery" />}
                label="Servicio a domicilio"
              />
            </FormGroup>
          </Grid>
        </Hidden>

        <Grid item md={10} style={{ width: '100%' }}>
          {
            isEmpty ?
              <div className="flex" style={{ width: '100%', height: '100%' }}>
                <h5 style={{ margin: 'auto' }}>No tiene órdenes registradas o los filtros no arrojaron resultados.</h5>
              </div> :
              <div>
                <TablePagination
                  className="my-2"
                  component="div"
                  count={filteredOrders.length}
                  page={page}
                  onChangePage={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  rowsPerPageOptions={[3, 6, 12, 24, 60]}
                />
                <Hidden mdUp>
                  <div className="flex">
                    <Button onClick={toggleOpenFilter} endIcon={<Tune />} style={{ margin: 'auto' }}>
                      Filtrar
              </Button>
                  </div>
                </Hidden>

                {
                  pageOrders.map((order) => {
                    return (
                      <OrderDescription key={order.Id} order={order} />
                    );
                  })
                }

                <TablePagination
                  component="div"
                  count={filteredOrders.length}
                  page={page}
                  onChangePage={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  rowsPerPageOptions={[3, 6, 12, 24, 60]}
                />
              </div>
          }
        </Grid>
      </div>

    </div>
  );
  // #endregion render.
}


// #region redux.
const mapStateToProps = state => ({
  user: state.UserSession,
  isLoading: state.IsAccountProcessLoading,
  orders: state.AccountOrdersList,
  stores: state.StoreList
});

const mapDispatchToProps = dispatch => ({
  loadStores: () => dispatch(loadStores()),
  startLoadingOrders: (user) => dispatch(loadAccountOrders(user))
});
// #endregion redux.

export default connect(mapStateToProps, mapDispatchToProps)(Orders);