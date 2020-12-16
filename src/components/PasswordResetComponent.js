// Created by Alfredo Rodriguez.
// <summary>
// PasswordReset will render the form to reset the password.
// </summary>
import React, { useEffect } from 'react';
import { Card, TextField, Button, InputAdornment } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Https } from '@material-ui/icons';
import { Constants } from './Constants';
import { passwordReset } from '../redux/viewmodels/Account';
const UrlEndpoints = Constants.UrlEndpoints;
const ValidationMessages = Constants.ValidationMessages;

function PasswordReset() {
  // #region private properties.
  const location = useLocation();
  const history = useHistory();
  // #endregion private properties.

  // #region public properties.
  const [password, setPassword] = React.useState("");
  // #endregion public properties.

  // #region public methods.
  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

  const reset = async (event) => {
    try {
      event.preventDefault();
      let querystring = location.search.toString() || "";
      const response = await passwordReset(querystring.split("token=")[1], password);
      history.push(UrlEndpoints.login);
      alert(response);
    } catch (error) {
      alert(error);
    }
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
    <Card className="p-4" style={{ margin: 'auto', width: 'fit-content', minWidth: '320px' }}>

      <h1 className="text-center">Reestablecer contraseña</h1>

      <div className="col-12 my-4" style={{ display: 'flex' }}>
        <img className="logo" src={process.env.PUBLIC_URL + "/img/carnes-la-paz-logo.png"} alt="Carnes Supremas" style={{ width: '150px', margin: 'auto' }} />
      </div>

      <form onSubmit={reset}>
        <div className="col-12 my-4" style={{ display: 'flex' }}>
          <TextField id="password" label="Nueva contraseña" type="password" value={password} onChange={updatePassword} style={{ margin: 'auto' }} required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Https />
                </InputAdornment>
              ),
            }} />
        </div>
        <div className="col-12 my-4" style={{ display: 'flex' }}>
          <Button className="my-2" type="submit" variant="contained" color="secondary" style={{ margin: 'auto' }}> Enviar </Button>
        </div>
      </form>
      <p className="text-center">Protegemos tus datos. Conoce nuestra <Link to={UrlEndpoints.privacy}>política de privacidad.</Link> </p>
    </Card>
  );
  // #endregion render.
}

export default PasswordReset;
