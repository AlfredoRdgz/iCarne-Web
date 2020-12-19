// Created by Alfredo Rodriguez.
// <summary>
// NavbarComponent will render the navigation bar with the search bar and the available links.
// </summary>
import React from 'react';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Link, useHistory } from 'react-router-dom';
import { AppBar, Toolbar, InputBase, Badge, Hidden, Drawer, ListItem, ListItemIcon, ListItemText, List, IconButton, Divider } from '@material-ui/core';
import { Search, PersonTwoTone, ShoppingCartTwoTone, ShoppingBasketTwoTone, MenuBookTwoTone, Menu, MenuOutlined, BusinessCenterTwoTone } from '@material-ui/icons';
import { connect } from 'react-redux';
import { searchProduct } from '../redux/thunks/ProductThunks';
import { preventReload } from '../redux/actions/ProductActions';
import { Constants } from './Constants';
const UrlEndpoints = Constants.UrlEndpoints;

function Navbar({ userSession, cart, search, cancelReload }) {
  // #region private properties.
  let history = useHistory();
  // #endregion private properties.

  // #region public properties.
  const [open, setOpen] = React.useState(false);
  // #endregion public properties.

  // #region public methods.
  const toggleOpen = () => {
    let isOpen = open;
    setOpen(!isOpen);
  }

  const closeMenu = () => {
    setOpen(false);
  }
  // #endregion public methods.

  // #region private methods.
  const handleSearch = (event) => {
    event.preventDefault();
    let searchInput = document.querySelector("#searchInput");
    // search(searchInput.value);
    let value = searchInput.value;
    searchInput.value = "";
    // cancelReload();
    history.push({ pathname: UrlEndpoints.products, search: `?search=${value}` });
  }
  // #endregion private methods.

  // #region render.
  return (
    <AppBar>
      <Toolbar className="navbar navbar-expand-md navbar-dark">

        <Hidden mdUp>
          <div className="flex-row">
            <IconButton onClick={toggleOpen} color="secondary">
              <MenuOutlined />
            </IconButton>
            <Link style={{ margin: 'auto 0px' }} to={UrlEndpoints.home}>
              <img className="logo" src={process.env.PUBLIC_URL + "/img/icarne menu.png"} alt="iCarne" style={{ width: '75px' }} />
            </Link>
            <form className="search-mobile" onSubmit={(event) => { handleSearch(event); }}>
              <InputBase id="searchInput" variant="outlined" placeholder="Buscar..." type="text" />
              <button type="submit" className="search-icon">
                <Search edge="end" />
              </button>
            </form>
            <Link to={UrlEndpoints.cart} style={{ margin: 'auto 0px auto auto' }} >
              <IconButton>
                <Badge badgeContent={cart.length} color="secondary" overlap="circle">
                  <ShoppingCartTwoTone />
                </Badge>
              </IconButton>
            </Link>
          </div>

          <Drawer id="mobileDrawer" anchor="left" open={open} onClose={closeMenu}>
            <List>
              <Link className="flex my-2" to={UrlEndpoints.home} onClick={toggleOpen} >
                <img className="logo" src={process.env.PUBLIC_URL + "/img/icarne.png"} alt="iCarne" style={{ width: '100px', margin: 'auto' }} />
              </Link>
              <Divider />
              {
                userSession.IsLoggedIn ?
                  <Link className="nav-link" to={UrlEndpoints.account} onClick={toggleOpen} >
                    <ListItem>
                      <ListItemIcon> <PersonTwoTone /> </ListItemIcon>
                      <ListItemText>Perfil</ListItemText>
                    </ListItem>
                  </Link>
                  :
                  <Link className="nav-link" to={UrlEndpoints.login} onClick={toggleOpen} >
                    <ListItem>
                      <ListItemIcon> <PersonTwoTone /> </ListItemIcon>
                      <ListItemText>Iniciar sesión</ListItemText>
                    </ListItem>
                  </Link>
              }
              <Divider />
              <Link className="nav-link" to={UrlEndpoints.products} onClick={toggleOpen} >
                <ListItem>
                  <ListItemIcon> <ShoppingBasketTwoTone /> </ListItemIcon>
                  <ListItemText>Productos</ListItemText>
                </ListItem>
              </Link>
              <Divider />
              <Link className="nav-link" to={UrlEndpoints.categories} onClick={toggleOpen} >
                <ListItem>
                  <ListItemIcon> <MenuBookTwoTone /> </ListItemIcon>
                  <ListItemText>Categorías</ListItemText>
                </ListItem>
              </Link>
              <Divider />
              <Link className="nav-link" to={UrlEndpoints.companies} onClick={toggleOpen} >
                <ListItem>
                  <ListItemIcon> <BusinessCenterTwoTone/> </ListItemIcon>
                  <ListItemText>Negocios</ListItemText>
                </ListItem>
              </Link>
              <Divider />
              <Link className="nav-link" to={UrlEndpoints.cart} onClick={toggleOpen} >
                <ListItem>
                  <ListItemIcon>
                    <Badge badgeContent={cart.length} color="secondary" overlap="circle">
                      <ShoppingCartTwoTone />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText>Carrito</ListItemText>
                </ListItem>
              </Link>
            </List>
          </Drawer>
        </Hidden>


        <Hidden smDown>
          <div className="collapse navbar-collapse" id="collapsibleNavbar" >
            <div className="row" style={{ padding: '10px 20px', backgroundColor: 'white', margin: 'auto' }}>
              <div className="container">
                <Link className="nav-link" to={UrlEndpoints.home}>
                  <img className="logo" src={process.env.PUBLIC_URL + "/img/icarne.png"} alt="iCarne" style={{ width: '100px' }} />
                </Link>
                <form className="search" onSubmit={(event) => { handleSearch(event); }}>
                  <InputBase id="searchInput" variant="outlined" placeholder="Buscar..." type="text" />
                  <button type="submit" className="search-icon">
                    <Search edge="end" />
                  </button>
                </form>
              </div>
            </div>

            <div className="row bg-primary" style={{ padding: '0 20px', marginRight: '0' }}>
              <div className="container">
                <div className="navbar-nav">
                  <Link className="nav-link" to={UrlEndpoints.products}>
                    Productos <ShoppingBasketTwoTone />
                  </Link>
                </div>
                <div className="navbar-nav">
                  <Link className="nav-link" to={UrlEndpoints.categories}>
                    Categorías <MenuBookTwoTone />
                  </Link>
                </div>
                <div className="navbar-nav">
                  <Link className="nav-link" to={UrlEndpoints.companies}>
                    Negocios <BusinessCenterTwoTone />
                  </Link>
                </div>
                <div className="navbar-nav">
                  <Link className="nav-link" to={UrlEndpoints.cart}>
                    Carrito
                    <Badge badgeContent={cart.length} color="secondary" overlap="circle">
                      <ShoppingCartTwoTone />
                    </Badge>
                  </Link>
                </div>
                {
                  userSession.IsLoggedIn ?
                    <div className="navbar-nav">
                      <Link className="nav-link" to={UrlEndpoints.account}>
                        Perfil <PersonTwoTone />
                      </Link>
                    </div>
                    :
                    <div className="navbar-nav">
                      <Link className="nav-link" to={UrlEndpoints.login}>
                        Iniciar sesión <PersonTwoTone />
                      </Link>
                    </div>
                }
              </div>
            </div>
          </div>
        </Hidden>
      </Toolbar>
    </AppBar >
  );
  // #endregion render.
}

// #region redux.
const mapStateToProps = (state) => ({
  userSession: state.UserSession,
  cart: state.Cart
});

const mapDispatchToProps = dispatch => ({
  search: (q) => dispatch(searchProduct(q)),
  cancelReload: () => dispatch(preventReload())
})
// #endregion redux.

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
