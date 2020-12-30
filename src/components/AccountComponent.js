// Created by Alfredo Rodriguez.
// <summary>
// AccountComponent will render the configuration options available for logged in users as well as additional information.
// </summary>
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Card } from '@material-ui/core';
import { Settings, Security, Info, Help, ExitToApp, Home, Receipt, Assignment, Email, Store } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { loadAccountContactInformation, logoutUser } from '../redux/thunks/AccountThunks';
import { Constants } from './Constants';
const UrlEndpoints = Constants.UrlEndpoints;

function Account({ user, profile, attemptLogout, loadContactInfo }) {

  // #region private properties.
  const { IsAdmin, AccessToken } = user;
  const { Name } = profile;
  const [mailLink, setMailLink] = React.useState(`mailto:info@icarne.mx?subject=Solicitud%20de%20aclaraci%C3%B3n%20cliente%20${profile.Email}`);
  // #endregion private properties.

  // #region public methods.
  const logout = () => {
    attemptLogout(AccessToken);
  }
  // #region public methods.

  // #region private methods.
  useEffect(() => {
    loadContactInfo(AccessToken);
  }, []);

  useEffect(() => {
    setMailLink(`mailto:info@icarne.mx?subject=Solicitud%20de%20aclaraci%C3%B3n%20cliente%20${profile.Email}`);
  }, [profile]);
  // #endregion private methods.

  // #region render.
  return (
    <div className="container">

      <h1>Hola {Name || ""}:</h1>

      <h5>Mi cuenta</h5>

      <Link to={UrlEndpoints.accountContact}>
        <Card className="link-card">
          <Settings /> Configuración de contacto
        </Card>
      </Link>
      {
        IsAdmin ?
          (<div>
            <Link to={UrlEndpoints.accountProducts}>
              <Card className="link-card">
                <Assignment /> Mis productos
              </Card>
            </Link>
            <Link to={UrlEndpoints.accountStores}>
              <Card className="link-card">
                <Store /> Mis sucursales
              </Card>
            </Link>
            <Link to={UrlEndpoints.companyPortal}>
              <Card className="link-card">
                <Home /> Desglose de ventas
              </Card>
            </Link>
          </div>) : ""
      }
      {
        !IsAdmin ?
          (<Link to={UrlEndpoints.accountAddress}>
            <Card className="link-card">
              <Home /> Mis domicilios
            </Card>
          </Link>) : ""
      }
      <Link to={UrlEndpoints.accountOrders}>
        <Card className="link-card">
          <Receipt /> Mis pedidos
        </Card>
      </Link>
      <a href={mailLink} target="_blank">
        <Card className="link-card">
          <Email />
          Solicitar aclaración
        </Card>
      </a>

      <hr />

      <h5>Información útil</h5>
      <Link to={UrlEndpoints.faq}>
        <Card className="link-card">
          <Help /> Preguntas frecuentes
        </Card>
      </Link>
      <Link to={UrlEndpoints.privacy}>
        <Card className="link-card">
          <Security /> Aviso de privacidad
        </Card>
      </Link>
      <Link to={UrlEndpoints.tou}>
        <Card className="link-card">
          <Info /> Términos y condiciones
        </Card>
      </Link>

      <hr />

      <Link to={UrlEndpoints.login} onClick={logout}>
        <Card className="link-card">
          <ExitToApp /> Cerrar sesión
        </Card>
      </Link>

    </div>
  );
  // #endregion render.
}

// #region redux.
const mapStateToProps = state => ({
  user: state.UserSession,
  profile: state.AccountContactInformation
});

const mapDispatchToProps = dispatch => ({
  attemptLogout: (accessToken) => dispatch(logoutUser(accessToken)),
  loadContactInfo: (accessToken) => dispatch(loadAccountContactInformation(accessToken))
});
// #endregion redux.

export default connect(mapStateToProps, mapDispatchToProps)(Account);
