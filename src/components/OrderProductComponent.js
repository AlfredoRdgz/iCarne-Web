// Created by Alfredo Rodriguez.
// <summary>
// ProductComponent will render the individual product and will provide a redirect method to open the ProductDetailComponent.
// </summary>
import React from 'react';
import { Badge, Card } from '@material-ui/core';

function OrderProduct({ product }) {
  // #region private properties.
  const { Name, Category, Image, Amount, Subtotal } = product;
  // #endregion private properties.

  // #region render.
  return (
    <Card className="row m-2 p-2">
      <Badge badgeContent={Amount} color="secondary" overlap="circle" max={999}>
        <img src={Image} style={{ maxWidth: '75px', maxHeight: '75px' }} alt="" className="color-tertiary m-2" />
      </Badge>
      <div className="text-right" style={{ width: 'calc(100% - 100px)'}}>
        <h5>{Name}</h5>
        <p style={{ margin: '0' }}><b>Subtotal:</b> ${Subtotal.toFixed(2)}</p>
      </div>
    </Card>
  );
  // #endregion render.
}

export default OrderProduct;
