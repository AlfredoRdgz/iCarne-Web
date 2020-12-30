// Created by Alfredo Rodriguez.
// <summary>
// CompanyPortalComponent will render the total sale numbers from one company.
// </summary>
import { Card, CardActions, CardContent, Icon, IconButton } from '@material-ui/core';
import { AttachMoneyOutlined, Rowing, ShoppingCartOutlined, TrendingUpOutlined } from '@material-ui/icons';
import React from 'react';

function CompanyPortal() {
  // #region render.
  return(
    <div className="container my-2">
      <h1 className="text-center">DESGLOSE DE VENTAS</h1>
      <div className="row">
        <div className="col-12 col-sm-4 col-lg-4">
          <Card className="bg-color-primary my-2" variant="outlined"> 
          <CardContent>
          <h2 className="color-secondary">Ordenes Generadas</h2>
          <div className="row">
          <div className="col-6">
            <IconButton  className="color-secondary" size="large" variant="contained">
              <TrendingUpOutlined style={{ fontSize: '64px'}}/>
            </IconButton>
          </div>
          <div className="col-6">
            <h1 className="color-secondary" style={{ fontSize: '64px'}}>35</h1>     
          </div>
          </div>
          </CardContent>
          <CardActions></CardActions>
          </Card>
        </div>
        <div className="col-12 col-sm-4 col-lg-4">
        <Card className="bg-color-secondary my-2" variant="outlined"> 
          <CardContent>
          <h2>Productos Vendidos</h2>
          <div className="row">
          <div className="col-6">
            <IconButton size="large" variant="contained" color="secondary">
              <ShoppingCartOutlined style={{ fontSize: '64px'}}/>
            </IconButton>
          </div>
          <div className="col-6">
            <h1 style={{ fontSize: '64px'}}>35</h1>     

          </div>
          </div>
          </CardContent>
          <CardActions></CardActions>
          </Card>
        </div>
        <div className="col-12 col-sm-4 col-lg-4">
        <Card className="bg-color-primary my-2"  variant="outlined"> 
          <CardContent>
          <h2 className="color-secondary">Total de Ingresos</h2>
          <div className="row">
          <div className="col-6">
            <IconButton className="color-secondary" size="large" variant="contained">
              <AttachMoneyOutlined style={{ fontSize: '64px'}}/>
            </IconButton>
          </div>
          <div className="col-6">
            <h1 className="color-secondary" style={{ fontSize: '64px'}}>35</h1>     

          </div>
          </div>
          </CardContent>
          <CardActions></CardActions>
          </Card>
        </div>
      </div>
    </div>

  );
  // #endregion render.
}

export default CompanyPortal;



