// Created by Alfredo Rodriguez.
// <summary>
// RegisterComponent will render the basic sign up form.
// </summary>
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TextField, Button, FormControlLabel, Checkbox, InputAdornment } from '@material-ui/core';
import { registerCompany } from '../redux/thunks/AccountThunks';
import { Link, useHistory } from 'react-router-dom';
import { AccountBalance, Business, Email, Https, Phone } from '@material-ui/icons';
import { Constants } from './Constants';
const UrlEndpoints = Constants.UrlEndpoints;
const ValidationMessages = Constants.ValidationMessages;

function CompanyRegister({ user, attemptSignUp }) {
  // #region private properties.
  let history = useHistory();
  // #endregion private properties.

  // #region public properties.
  const [companyName, setCompanyName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rfc, setRFC] = React.useState("");
  const [tou, setTou] = React.useState(false);
  const [privacy, setPrivacy] = React.useState(false);
  // #endregion public properties.

  // #region public methods.
  const updateCompanyName = (event) => {
    setCompanyName(event.target.value);
  }

  const updatePhone = (event) => {
    setPhone(event.target.value);
  }

  const updateEmail = (event) => {
    setEmail(event.target.value);
  }

  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

  const updateRFC = (event) => {
    setRFC(event.target.value);
  };

  const checkTOU = (event) => {
    setTou(!tou);
  }

  const checkPrivacy = (event) => {
    setPrivacy(!privacy);
  }

  const register = (event) => {
    event.preventDefault();
    attemptSignUp(companyName, rfc, email, phone, password)
  }

  if (user?.IsLoggedIn) {
    history.push(UrlEndpoints.home);
  }

  // Input validation.
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
    <div className="p-4 container paper-container">

      <h1 className="text-center">Registro empresa</h1>

      <div className="col-12 my-4" style={{ display: 'flex' }}>
        <img className="logo" src={process.env.PUBLIC_URL + "/img/icarne.png"} alt="iCarne" style={{ width: '150px', margin: 'auto' }} />
      </div>

      <form onSubmit={register}>
        <div className="col-12 my-4" style={{ display: 'flex' }}>
          <TextField id="companyName" label="Razón Social" type="text" value={companyName} onChange={updateCompanyName} style={{ margin: 'auto' }} required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Business />
                </InputAdornment>
              ),
            }} />
        </div>
        <div className="col-12 my-4" style={{ display: 'flex' }}>
          <TextField id="rfc" label="RFC" type="rfc" value={rfc} onChange={updateRFC} style={{ margin: 'auto' }} required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountBalance />
                </InputAdornment>
              ),
            }} />
        </div>
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
          <TextField id="phone" label="Teléfono principal de contacto" type="phone" value={phone} onChange={updatePhone} style={{ margin: 'auto' }} required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone />
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
          <FormControlLabel
            control={<Checkbox id="tou" checked={tou} onChange={checkTOU} name="tou" required />}
            label={
              <p style={{ margin: 'auto' }}>Acepto los &nbsp;
              <Link to={UrlEndpoints.tou}>
                  términos y condiciones
              </Link>
              </p>
            }
            style={{ margin: 'auto' }}
          />
        </div>
        <div className="col-12 my-4" style={{ display: 'flex' }}>
          <FormControlLabel
            control={<Checkbox id="privacy" checked={privacy} onChange={checkPrivacy} name="privacy" required />}
            label={
              <p style={{ margin: 'auto' }}>
                Acepto que mis datos sean tratados de acuerdo con lo establecido en nuestro &nbsp;
                <Link to={UrlEndpoints.privacy}>aviso de privacidad.</Link>
              </p>
            }
            style={{ margin: 'auto' }}
          />
        </div>
        <div className="col-12" style={{ display: 'flex' }}>
          <Button className="my-2" type="submit" variant="contained" color="secondary" style={{ margin: 'auto' }}> Crear cuenta </Button>
        </div>
      </form>
      <div className="col-12 my-4" style={{ display: 'flex' }}>
        <p className="text-center" style={{ margin: 'auto' }}>Ya tengo una cuenta. <Link to={UrlEndpoints.login}> Iniciar sesión. </Link> </p>
      </div>
    </div>
  );
  // #endregion render.
}

// #region redux.
const mapStateToProps = state => ({
  user: state.UserSession,
});

const mapDispatchToProps = dispatch => ({
  attemptSignUp: (companyName, rfc, email, phone, password) => dispatch(registerCompany(companyName, rfc, email, phone, password))
});
// #endregion redux.

export default connect(mapStateToProps, mapDispatchToProps)(CompanyRegister);
