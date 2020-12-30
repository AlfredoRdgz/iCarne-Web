// Created by Alfredo Rodriguez.
// <summary>
// AppComponent will provide all routing options to connect all components in the application.
// </summary>
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CompanyPortal from './CompanyPortalComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Navbar from './NavbarComponent';
import NotFound from './NotFoundComponent';
import Cart from './CartComponent';
import ProductList from './ProductListComponent';
import ProductDetail from './ProductDetailComponent';
import Account from './AccountComponent';
import AccountEdit from './AccountEditComponent';
import TermsOfUse from './TemsOfUseComponent';
import PrivacyStatement from './PrivacyStatementComponent';
import FAQ from './FAQComponent';
import AddressEdit from './AddressEditComponent';
import Checkout from './CheckoutComponent';
import Login from './LoginComponent';
import CategoryList from './CategoryListComponent';
import Register from './RegisterComponent';
import CompanyRegister from './CompanyRegisterComponent';
import UserRegister from './UserRegisterComponent';
import OrderDetail from './OrderDetailComponent';
import Orders from './OrdersComponent';
import { validateUserSession } from '../redux/thunks/AccountThunks';
import ProtectedRoute from './ProtectedRouteComponent';
import AdminProductEdit from './AdminProductEditComponent';
import AdminProducts from './AdminProductsComponent';
import { Constants } from './Constants';
import Footer from './FooterComponent';
import ContactUs from './ContactComponent';
import AdminStores from './AdminStoresComponent';
import AdminStoreEdit from './AdminStoreEditComponent';
import ForgotPassword from './ForgotPasswordComponent';
import PasswordReset from './PasswordResetComponent';
import CompanyList from './CompanyListComponent';
const UrlEndpoints = Constants.UrlEndpoints;

function App({ user, validateSession, isAccountLoading }) {
  // #region private methods.
  useEffect(() => {
    validateSession(user);
  }, []);
  // #endregion private methods.

  // #region render.
  const loader =
    <div className="App">
      <Navbar />
      <div className="master-page"><div className="loader-container"><div className="loader"></div></div>
      </div>
      <Footer />
    </div>


  const content =
    <div className="App">
      <div id="main">
        <Navbar />
        <div className="master-page">
          <Switch>
            <Route exact path={UrlEndpoints.home} component={ProductList} />
            <Route exact path={UrlEndpoints.login} component={Login} />
            <Route exact path={UrlEndpoints.register} component={Register} />
            <Route exact path={UrlEndpoints.companyRegister} component={CompanyRegister} />
            <Route exact path={UrlEndpoints.clientRegister} component={UserRegister} />
            <Route path={UrlEndpoints.categories} component={CategoryList} />
            <Route path={UrlEndpoints.companies} component={CompanyList} />
            <Route exact path={UrlEndpoints.products} component={ProductList} />
            <Route path={UrlEndpoints.productDetail} component={ProductDetail} />
            <Route path={UrlEndpoints.cart} component={Cart} />
            <Route path={UrlEndpoints.companyPortal} component={CompanyPortal} />
            <Route path={UrlEndpoints.forgotPassword} component={ForgotPassword} />
            <Route path={UrlEndpoints.passwordReset} component={PasswordReset} />
            <ProtectedRoute exact path={UrlEndpoints.checkout} component={Checkout} />
            <ProtectedRoute exact path={UrlEndpoints.account} component={Account} />
            <ProtectedRoute path={UrlEndpoints.accountContact} component={AccountEdit} />
            <ProtectedRoute path={UrlEndpoints.accountAddress} component={AddressEdit} />
            <ProtectedRoute exact path={UrlEndpoints.accountOrders} component={Orders} />
            <ProtectedRoute path={UrlEndpoints.accountOrderDetail} component={OrderDetail} />
            <ProtectedRoute exact path={UrlEndpoints.accountProducts} component={AdminProducts} />
            <ProtectedRoute path={UrlEndpoints.accountProductEdit} component={AdminProductEdit} />
            <ProtectedRoute exact path={UrlEndpoints.accountStores} component={AdminStores} />
            <ProtectedRoute path={UrlEndpoints.accountStoreEdit} component={AdminStoreEdit} />
            <Route path={UrlEndpoints.privacy} component={PrivacyStatement} />
            <Route path={UrlEndpoints.tou} component={TermsOfUse} />
            <Route path={UrlEndpoints.faq} component={FAQ} />
            <Route path={UrlEndpoints.contactUs} component={ContactUs} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
      <Footer />
    </div>

  return isAccountLoading ? loader : content;
  // #endregion render.
}

// #region redux.
const mapStateToProps = state => ({
  user: state.UserSession,
  isAccountLoading: state.IsAccountSessionLoading
});

const mapDispatchToProps = dispatch => ({
  validateSession: (userSession) => dispatch(validateUserSession(userSession))
});
// #endregion redux.

export default connect(mapStateToProps, mapDispatchToProps)(App);

