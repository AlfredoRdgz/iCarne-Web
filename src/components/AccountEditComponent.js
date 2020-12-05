// Created by Alfredo Rodriguez.
// <summary>
// AccountEditComponent will render the basic account information and will provide the ability to edit and save changes.
// </summary>
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, TextField, Button, Breadcrumbs } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { loadAccountContactInformation } from '../redux/thunks/AccountThunks';
import { updateBasicInfo, updatePassword } from '../redux/viewmodels/Account';
import { Constants } from './Constants';
const UrlEndpoints = Constants.UrlEndpoints;

function AccountEdit({ user, contactInformation, loadContactInfo }) {
  // #region public properties.
  const [name, setName] = React.useState(contactInformation?.Name || '');
  const [surname, setSurname] = React.useState(contactInformation?.Surame || '');
  const [email, setEmail] = React.useState(contactInformation?.Email || '');
  const [phone, setPhone] = React.useState(contactInformation?.Phone || '');
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  // #endregion public properties.

  // #region public methods.
  const updateName = (event) => {
    setName(event.target.value);
  }

  const updateSurname = (event) => {
    setSurname(event.target.value);
  }

  const updateEmail = (event) => {
    setEmail(event.target.value);
  }

  const updatePhone = (event) => {
    setPhone(event.target.value);
  }

  const updatePersonalData = async () => {
    try {
      let result = await updateBasicInfo(user?.AccessToken, name, surname, email, phone);
      loadContactInfo(user?.AccessToken);
      alert(result);
    } catch (error) {
      alert(error);
    }
  };

  const updateNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const updateCurrentPassword = (event) => {
    setCurrentPassword(event.target.value);
  };

  const changePassword = async () => {
    try {
      // eslint-disable-next-line no-restricted-globals
      let confirmation = confirm("Se cambiará la contraseña de su cuenta. Esta acción no es reversible. ¿Desea continuar?");
      if (confirmation) {
        let result = await updatePassword(user?.AccessToken, newPassword, currentPassword);
        alert(result);
      }
    } catch (error) {
      alert(error);
    }
  }
  // #endregion public methods.

  // #region private methods.
  function updateContact(contactInformation) {
    setName(contactInformation?.Name || '');
    setSurname(contactInformation?.Surname || '');
    setEmail(contactInformation?.Email || '');
    setPhone(contactInformation?.Phone || '');
  }

  useEffect(() => {
    if (!contactInformation?.Name) {
      loadContactInfo(user?.AccessToken);
    }
  }, []);

  useEffect(() => {
    updateContact(contactInformation);
  }, [contactInformation]);
  // #endregion private methods.

  // #region render.
  return (
    <div className="container p-4">

      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to={UrlEndpoints.account}>
          Mi cuenta
        </Link>
        <Link to="#" color="secondary">
          Contacto
        </Link>
      </Breadcrumbs>

      <h1 className="text-center">Configuración de cuenta</h1>


      <Card className="container p-4">
        <h2> Datos de contacto </h2>
        <div className="my-2">
          <TextField id="userName" label="Nombre(s)" value={name} onChange={updateName} style={{ margin: 'auto' }} />
        </div>
        <div className="my-2">
          <TextField id="surname" label="Apellido(s)" value={surname} onChange={updateSurname} style={{ margin: 'auto' }} />
        </div>
        <div className="my-2">
          <TextField id="userEmail" label="Correo electrónico" type="email" value={email} onChange={updateEmail} style={{ margin: 'auto' }} />
        </div>
        <div className="my-2">
          <TextField id="userPhone" label="Teléfono de contacto" type="phone" value={phone} onChange={updatePhone} style={{ margin: 'auto' }} />
        </div>
        <div className="row">
          <Button className="my-2" onClick={updatePersonalData} variant="contained" color="secondary" style={{ margin: 'auto 20px auto auto' }}> Actualizar </Button>
        </div>
      </Card>

      <hr />


      <Card className="container p-4">
        <h2> Cambiar contraseña </h2>
        <div className="my-2">
          <TextField id="userCurrentPassword" label="Contraseña actual" type="password" value={currentPassword} onChange={updateCurrentPassword} style={{ margin: 'auto' }} />
        </div>
        <div className="my-2">
          <TextField id="userNewPassword" label="Nueva contraseña" type="password" value={newPassword} onChange={updateNewPassword} style={{ margin: 'auto' }} />
        </div>
        <div className="row">
          <Button className="my-2" onClick={changePassword} variant="contained" color="secondary" style={{ margin: 'auto 20px auto auto' }}> Cambiar contraseña </Button>
        </div>
      </Card>

    </div>
  );
  // #endregion render.
}

// #region redux.
const mapStateToProps = state => ({
  user: state.UserSession,
  contactInformation: state.AccountContactInformation
});

const mapDispatchToProps = dispatch => ({
  loadContactInfo: (accessToken, setCallback) => dispatch(loadAccountContactInformation(accessToken, setCallback))
});
// #endregion redux.

export default connect(mapStateToProps, mapDispatchToProps)(AccountEdit);
