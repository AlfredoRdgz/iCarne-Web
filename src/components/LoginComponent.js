// Created by Alfredo Rodriguez.
// <summary>
// LoginComponent will render the basic sign in form.
// </summary>
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, TextField, Button, InputAdornment } from '@material-ui/core';
import { loginUser } from '../redux/thunks/AccountThunks';
import { Link, useHistory } from 'react-router-dom';
import { Email, Https } from '@material-ui/icons';
import { Constants } from './Constants';
const UrlEndpoints = Constants.UrlEndpoints;
const ValidationMessages = Constants.ValidationMessages;

function Login({ user, attemptLogin }) {
  // #region private properties.
  let history = useHistory();
  // #endregion private properties.

  // #region public properties.
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // #endregion public properties.

  // #region public methods.
  const updateEmail = (event) => {
    setEmail(event.target.value);
  }

  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

  const login = (event) => {
    event.preventDefault();
    attemptLogin(email, password);
  }

  if (user?.IsLoggedIn) {
    history.goBack();
  }

  useEffect(() => {
    let inputs = document.getElementsByTagName('input');
    for (let input of inputs) {
      input.addEventListener('invalid', (event) => {
        const target = event.target;
        target.setCustomValidity(ValidationMessages[target.id]);
      });
      input.addEventListener('input', (event) => {
        event.target.setCustomValidity('');
      });
    }
  }, []);
  // #endregion public methods.

  // #region render.
  return (
    <div className="container paper-container p-4">

      <h1 className="text-center">Iniciar sesión</h1>

      <div className="col-12 my-4" style={{ display: 'flex' }}>
        <img className="logo" src={process.env.PUBLIC_URL + "/img/icarne.png"} alt="iCarne" style={{ width: '150px', margin: 'auto' }} />
      </div>

      <form onSubmit={login}>
        <div className="col-12 my-4" style={{ display: 'flex' }}>
          <TextField id="email" label="Correo electrónico" type="email" value={email} onChange={updateEmail} style={{ margin: 'auto' }} required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }} />
        </div>
        <div className="col-12 my-4" style={{ display: 'flex' }}>
          <TextField id="password" label="Contraseña" type="password" value={password} onChange={updatePassword} style={{ margin: 'auto' }} required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Https />
                </InputAdornment>
              ),
            }} />
        </div>
        <div className="col-12 my-4" style={{ display: 'flex' }}>
          <Button className="my-2" type="submit" variant="contained" color="secondary" style={{ margin: 'auto' }}> Iniciar Sesión </Button>
        </div>
      </form>
      <div className="col-12 my-4" style={{ display: 'flex' }}>
        <p className="text-center" style={{ margin: 'auto' }}>¿No tiene una cuenta? <Link to={UrlEndpoints.register}>Regístrese.</Link></p>
      </div>
      <p className="text-center">Protegemos tus datos. Conoce nuestra <Link to={UrlEndpoints.privacy}>política de privacidad.</Link> </p>
    </div>
  );
  // #endregion render.
}

// #region redux.
const mapStateToProps = state => ({
  user: state.UserSession,
});

const mapDispatchToProps = dispatch => ({
  attemptLogin: (email, password) => dispatch(loginUser(email, password))
});
// #endregion redux.

export default connect(mapStateToProps, mapDispatchToProps)(Login);
