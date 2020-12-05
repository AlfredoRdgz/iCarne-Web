// Created by Alfredo Rodriguez.
// <summary>
// NotFoundComponent will render the default page whenever a user enters a non registered route within the AppComponent.
// </summary>
import React from 'react';
import { Link } from 'react-router-dom';
import { Constants } from './Constants';
const UrlEndpoints = Constants.UrlEndpoints;

function NotFound() {
  // #region render.
  return (
    <div className="container" style={{ margin: 'auto', textAlign: 'center' }}>
      <h1> Oops! Algo salió mal</h1>
      <h2> El contenido que buscó no pudo ser encontrado</h2>

      <img src={process.env.PUBLIC_URL + "/img/icarne.png"} alt="iCarne" />

      <p> Verifica que el enlace con el que ingresaste sea un enlace válido o intenta con otra búsqueda. Puedes redirigirte a cualquiera de las siguientes opciones: </p>

      <div className="row" style={{ margin: 'auto' }}>
        <ul style={{ margin: 'auto' }}>
          <li>
            <Link className="nav-link color-secondary" to={UrlEndpoints.products}>
              Productos
            </Link>
          </li>
          <li>
            <Link className="nav-link color-secondary" to={UrlEndpoints.cart}>
              Mi carrito
            </Link>
          </li>
          <li>
            <Link className="nav-link color-secondary" to={UrlEndpoints.account}>
              Perfil
            </Link>
          </li>
        </ul>
      </div>

    </div>
  );
  // #endregion render.
}

export default NotFound;
