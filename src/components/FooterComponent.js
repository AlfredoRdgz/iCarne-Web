// Created by Alfredo Rodriguez.
// <summary>
// FooterComponent will render the site footer.
// </summary>
import React from 'react';
import { Link } from 'react-router-dom';
import { Constants } from './Constants';
import { connect } from 'react-redux';
const UrlEndpoints = Constants.UrlEndpoints;

function Footer({ user }) {
    // #region render.
    return (
        <footer className="row">
            <div className="col-12 col-md-4">
                <p>Enlaces</p>
                <ul>
                    <li>
                        <Link to={UrlEndpoints.products}>Productos</Link>
                    </li>
                    <li>
                        <Link to={UrlEndpoints.cart}>Carrito</Link>
                    </li>
                    <li>
                        <Link to={UrlEndpoints.contactUs}>Contacto y sucursales</Link>
                    </li>
                </ul>
            </div>
            <div className="col-12 col-md-4" >
                <p>Ayuda</p>
                <ul>
                    <li>
                        <Link to={UrlEndpoints.faq}>Preguntas frecuentes</Link>
                    </li>
                    <li>
                        <Link to={UrlEndpoints.privacy}>Aviso de privacidad</Link>
                    </li>
                    <li>
                        <Link to={UrlEndpoints.tou}>Términos y condiciones</Link>
                    </li>
                </ul>
            </div>
            <div className="col-12 col-md-4">
                <p>Mi cuenta</p>
                {
                    user?.IsLoggedIn ?
                        <ul>
                            <li>
                                <Link to={UrlEndpoints.accountContact}>Información de contacto</Link>
                            </li>
                            <li>
                                <Link to={UrlEndpoints.accountOrders}>Mis órdenes</Link>
                            </li>
                            <li>
                                {
                                    user?.IsAdmin ?
                                        <Link to={UrlEndpoints.accountProducts}> Mis productos</Link> :
                                        <Link to={UrlEndpoints.accountAddress}> Mis domicilios</Link>
                                }
                            </li>
                        </ul> :
                        <ul>
                            <li>
                                <Link to={UrlEndpoints.login}>Iniciar sesión</Link>
                            </li>
                            <li>
                                <Link to={UrlEndpoints.register}>Regístrate</Link>
                            </li>
                        </ul>
                }
            </div> :
            <i>iCarne, 2020.</i>
        </footer >
    );
    // #endregion render.
}

// #region redux.
const mapStateToProps = state => ({
    user: state.UserSession,
});
// #endregion redux.

export default connect(mapStateToProps)(Footer);