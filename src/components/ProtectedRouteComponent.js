// Created by Alfredo Rodriguez.
// <summary>
// ProductDetailComponent will render the detailed description of the product, and will provide capabilities
// to select a number of products and add them to the cart as well as to redirect to the checkout directly.
// </summary>
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Constants } from './Constants';
const UrlEndpoints = Constants.UrlEndpoints;

function ProtectedRoute({ user, props }) {
    // #region render.
    return (
        <Route path={props.path} render={(data) => (
            user.IsLoggedIn === true
                ? <props.component {...data} />
                : <Redirect to={UrlEndpoints.login} />
        )} />
    );
    // #endregion render.
}

// #region redux.
const mapStateToProps = (state, ownProps) => ({
    user: state.UserSession,
    props: ownProps,
});
// #endregion redux.

export default connect(mapStateToProps)(ProtectedRoute);