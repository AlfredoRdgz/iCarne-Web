// Created by Alfredo Rodriguez.
// <summary>
// ForgotPassword will render the form to send a password recovery email to the user.
// </summary>
import React, { useEffect } from 'react';
import { Card, TextField, Button, InputAdornment } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { Email } from '@material-ui/icons';
import { Constants } from './Constants';
import { recoverForgotPassword } from '../redux/viewmodels/Account';
const UrlEndpoints = Constants.UrlEndpoints;
const ValidationMessages = Constants.ValidationMessages;

function ForgotPassword() {
  // #region private properties.
  const history = useHistory();

  const [sent, setSent] = React.useState(false);
  const [message, setMessage] = React.useState("");
  // #endregion private properties.

  // #region public properties.
  const [email, setEmail] = React.useState("");
  // #endregion public properties.

  // #region public methods.
  const updateEmail = (event) => {
    setEmail(event.target.value);
  }

  const requestReset = async (event) => {
    try {
      event.preventDefault();
      console.log("Enviando");
      const response = await recoverForgotPassword(email);
      console.log(response);
      setMessage(`Se ha enviado un mensaje con las instrucciones para el cambio de contraseña al correo ${email}.`);
      setSent(true);
    } catch (error) {
      setMessage(error);
      setSent(true);
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
  const resetForm = (
    <Card className="p-4" style={{ margin: 'auto', width: 'fit-content', minWidth: '320px' }}>

      <h1 className="text-center">Recuperar contraseña</h1>

      <div className="col-12 my-4" style={{ display: 'flex' }}>
        <img className="logo" src={process.env.PUBLIC_URL + "/img/carnes-la-paz-logo.png"} alt="Carnes Supremas" style={{ width: '150px', margin: 'auto' }} />
      </div>

      <form onSubmit={requestReset}>
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
          <Button className="my-2" type="submit" variant="contained" color="secondary" style={{ margin: 'auto' }}> Enviar </Button>
        </div>
      </form>
      <div className="col-12 my-4" style={{ display: 'flex' }}>
        <p className="text-center" style={{ margin: 'auto' }}>¿Recordó su contraseña? <Link to={UrlEndpoints.login}>Iniciar sesión.</Link></p>
      </div>
      <div className="col-12 my-4" style={{ display: 'flex' }}>
        <p className="text-center" style={{ margin: 'auto' }}>¿No tiene una cuenta? <Link to={UrlEndpoints.register}>Regístrese.</Link></p>
      </div>
      <p className="text-center">Protegemos tus datos. Conoce nuestra <Link to={UrlEndpoints.privacy}>política de privacidad.</Link> </p>
    </Card>
  );

  const notificationMessage = (
    <Card className="p-4" style={{ margin: 'auto', width: 'fit-content', minWidth: '320px' }}>
      <p className="text-center"> {message} </p>
      <Button className="my-2" onClick={() => { history.push(UrlEndpoints.login); }} variant="contained" color="secondary" style={{ margin: 'auto' }}>Volver a login</Button>
    </Card>
  );

  return sent ? notificationMessage : resetForm;
  // #endregion render.
}

export default ForgotPassword;
