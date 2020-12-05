// Created by Alfredo Rodriguez.
// <summary>
// AddressEditComponent will provide all addresses saved by the current user as well as options to update, add or delete them.
// </summary>
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Breadcrumbs } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import { loadAccountAddresses } from '../redux/thunks/AccountThunks';
import { saveAddress, updateExistingAddress, removeAddress } from '../redux/viewmodels/Account';
import { Constants } from './Constants';
const UrlEndpoints = Constants.UrlEndpoints;

function AddressEdit({ user, addressList, loadAddresses }) {
  // #region public properties.
  const [addresses, setAddresses] = React.useState(addressList || []);
  // #endregion public properties.

  // #region public methods.
  const addAddress = (newData) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (newData.State !== "Jalisco") {
          throw "Actualmente sólo se permiten envíos a domicilios en el estado de Jalisco.";
        }
        const result = await saveAddress(user?.AccessToken, newData);
        newData.Id = result.insertedId;
        const data = [...addresses];
        data.push(newData);
        setAddresses(data);
        loadAddresses(user?.AccessToken);
        resolve();
      } catch (error) {
        alert(error);
        reject();
      }
    });
  }

  const updateAddress = (newData, oldData) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (newData.State !== "Jalisco") {
          throw "Actualmente sólo se permiten envíos a domicilios en el estado de Jalisco.";
        }
        await updateExistingAddress(user?.AccessToken, oldData, newData);
        const data = [...addresses];
        data[data.indexOf(oldData)] = newData;
        setAddresses(data);
        loadAddresses(user?.AccessToken);
        resolve();
      } catch (error) {
        alert(error);
        reject();
      }
    });
  }

  const deleteAddress = (oldData) => {
    return new Promise(async (resolve, reject) => {
      try {
        await removeAddress(user?.AccessToken, oldData);
        const data = [...addresses];
        data.splice(data.indexOf(oldData), 1);
        setAddresses(data);
        loadAddresses(user?.AccessToken);
        resolve();
      } catch (error) {
        alert(error);
        reject();
      }
    });
  }
  // #endregion public methods.

  // #region private methods.
  useEffect(() => {
    if (addressList.length === 0) {
      loadAddresses(user?.AccessToken);
    }
  }, []);

  useEffect(() => {
    setAddresses(addresses);
  }, [addresses]);
  // #endregion private methods.

  // #region render.
  return (
    <div className="container p-4">

      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to={UrlEndpoints.account}>
          Mi cuenta
        </Link>
        <Link to="#" color="secondary">
          Domicilios
        </Link>
      </Breadcrumbs>

      <h1 className="text-center">Administrar domicilios</h1>

      <MaterialTable
        style={{ margin: '20px 0' }}
        title="Mis domicilios"
        columns={[{ title: "Dirección", field: "Address" }, { title: "Colonia", field: "Neighborhood" }, { title: "Código Postal", field: "ZIP" }, { title: "Ciudad", field: "City" }, { title: "Estado", field: "State" }, { title: "País", field: "Country" }]}
        data={addresses}
        editable={{
          onRowAdd: addAddress,
          onRowUpdate: updateAddress,
          onRowDelete: deleteAddress
        }}
        options={{
          search: false
        }}
      />

    </div>
  );
  // #endregion render.
}

// #region redux.
const mapStateToProps = state => ({
  user: state.UserSession,
  addressList: state.AccountAddressesList
});

const mapDispatchToProps = dispatch => ({
  loadAddresses: (accessToken) => dispatch(loadAccountAddresses(accessToken))
});
// #endregion redux.

export default connect(mapStateToProps, mapDispatchToProps)(AddressEdit);
