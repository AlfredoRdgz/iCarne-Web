// Created by Alfredo Rodriguez.
// <summary>
// RegisterComponent will render the basic sign up form.
// </summary>
import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Constants } from './Constants';
const UrlEndpoints = Constants.UrlEndpoints;

function Register() {
  // #region render.
  return (
    <div className="container p-4 paper-container">

      <h1 className="text-center">Registro de cuenta</h1>

      <div className="col-12 my-4" style={{ display: 'flex' }}>
        <img className="logo" src={process.env.PUBLIC_URL + "/img/icarne.png"} alt="iCarne" style={{ width: '150px', margin: 'auto' }} />
      </div>

      <p className="text-center">Seleccione el tipo de cuenta por crear: </p>

      <div className="col-12 my-4" style={{ display: 'flex' }}>
        <Link to={UrlEndpoints.companyRegister} style={{ margin: 'auto' }}>
          <Button variant="contained" color="secondary">Soy una empresa</Button>
        </Link>
      </div>
      <div className="col-12 my-4" style={{ display: 'flex' }}>
        <Link to={UrlEndpoints.clientRegister} style={{ margin: 'auto' }}>
          <Button variant="contained" color="secondary">Soy un cliente</Button>
        </Link>
      </div>
      <div className="col-12 my-4" style={{ display: 'flex' }}>
        <p className="text-center" style={{ margin: 'auto' }}>Ya tengo una cuenta. &nbsp; <Link to={UrlEndpoints.login}> Iniciar sesión. </Link> </p>
      </div>
    </div>
  );
  // #endregion render.
}

export default Register;
