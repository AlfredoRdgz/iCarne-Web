// Created by Alfredo Rodriguez.
// <summary>
// OrderDetailComponent will render the detailed description of the order, and will provide capabilities
// to verify current order status as well as to rate your order.
// </summary>
import React from 'react';
import { Card, Stepper, Step, StepButton, Breadcrumbs, Paper } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom';
import OrderProduct from './OrderProductComponent';
import { connect } from 'react-redux';
import { rateOrder, updateOrderStatus } from '../redux/viewmodels/Order';
import { Constants } from './Constants';
const UrlEndpoints = Constants.UrlEndpoints;

function OrderDetail({ user, isLoading, order }) {
  // #region private properties.
  const { Id, OrderDate, DeliveryTypeId, PaymentTypeId, StatusId, Name, Email, Phone,
    Address, Neighborhood, ZIP, City, State, Country, DeliveryDate, Subtotal, Tip, Total, RatingScore, ProductList, StoreName, StorePhone,
    StoreAddress, StoreNeighborhood, StoreZIP, StoreCity, StoreState, StoreCountry } = order;
  const { DeliveryType, PaymentType } = Constants;
  const orderStatus = ['Orden generada', 'Orden aprobada', 'Preparando su orden', 'Orden enviada', 'Orden entregada'];
  // #endregion private properties.

  // #region public properties.
  const [activeStep, setActiveStep] = React.useState(StatusId);
  const [completed, setCompleted] = React.useState({});
  const [rating, setRating] = React.useState(RatingScore);
  // #endregion public properties.

  // #region private methods.
  const updateCompleted = (step) => {
    const newCompleted = {};
    for (let i = 0; i < step; i++) {
      newCompleted[i] = true;
    }
    setCompleted(newCompleted);
  }


  React.useEffect(() => {
    updateCompleted(activeStep);
  }, []);

  const handleStep = (step) => async () => {
    try {
      if (user?.IsAdmin) {
        if (step > activeStep) {
          // Update changes on server.
          await updateOrderStatus(user?.AccessToken, Id, step);
          // Update active step.
          setActiveStep(step);
          // Update completed steps.
          updateCompleted(step);
        }
        else {
          alert("Sólo puede actualizar el estatus hacia adelante. Para cualquier contratiempo es necesario contactar al cliente.");
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  const formatDate = (date) => {
    date = new Date(date);
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var aaaa = date.getFullYear();
    var hh = String(date.getHours()).padStart(2, '0');
    var min = String(date.getMinutes()).padStart(2, '0');

    return `${dd}/${mm}/${aaaa} ${hh}:${min}`;
  }
  // #endregion private methods.

  // #region render.
  const loader = <div className="loader-container"><div className="loader"></div></div>;

  const content =
    <div className="p-4 container" style={{ borderRadius: '20px' }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to={UrlEndpoints.account}>
          Mi cuenta
        </Link>
        <Link color="secondary" to={UrlEndpoints.accountOrders}>
          Órdenes
        </Link>
        <Link to="#" color="secondary">
          Detalle
        </Link>
      </Breadcrumbs>

      <h1 className="text-center my-4">Detalle de la orden</h1>
      <Card className="row my-4">
        <div className="p-4 container">
          <p className="description" style={{ margin: '0' }}><b>Número de orden:</b> {Id} </p>
          <p className="description" style={{ margin: '0' }}><b>Fecha de orden:</b> {formatDate(OrderDate)} </p>
          <p className="description" style={{ margin: '0' }}><b>Entrega programada:</b> {formatDate(DeliveryDate)} </p>
        </div>
      </Card>

      <div className="row" style={{ justifyContent: 'space-between', marginTop: '0', marginBottom: '0' }}>
        <Card className="my-2 p-3 col-12 col-md-4">
          <b>Datos de envío</b>
          <p className="description" style={{ margin: '0' }}>Método de entrega: {DeliveryTypeId === Number(DeliveryType.DELIVERY) ? "Envío a domicilio" : "Recoger en tienda"}</p>
          {
            DeliveryTypeId === Number(DeliveryType.DELIVERY) ?
              <div>
                <p className="description" style={{ margin: '0' }}>{Name} ({Email})</p>
                <p className="description" style={{ margin: '0' }}>{Address}</p>
                <p className="description" style={{ margin: '0' }}>{Neighborhood}</p>
                <p className="description" style={{ margin: '0' }}>{City}, {State}, {Country}, {ZIP}</p>
              </div>
              :
              <div>
                <p className="description" style={{ margin: '0' }}>{StoreName} ({StorePhone})</p>
                <p className="description" style={{ margin: '0' }}>{StoreAddress}</p>
                <p className="description" style={{ margin: '0' }}>{StoreNeighborhood}</p>
                <p className="description" style={{ margin: '0' }}>{StoreCity}, {StoreState}, {StoreCountry}, {StoreZIP}</p>
              </div>
          }
        </Card>
        <Card className="my-2 p-3  col-12 col-md-4">
          <b>Detalle de pago</b>
          <p className="description" style={{ margin: '0' }}>Método de pago: {PaymentTypeId === Number(PaymentType.CARD) ? "Tarjeta" : "Efectivo"}</p>
        </Card>
        <Card className="my-2 p-3 col-12 col-md-3">
          <b>Resumen del pedido</b>
          <table>
            <tbody>
              <tr>
                <td className="description">Subtotal:</td>
                <td className="description" style={{ paddingLeft: '20px' }}>$ {Subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="description">Propina:</td>
                <td className="description" style={{ paddingLeft: '20px' }}>$ {Tip.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="description">Total:</td>
                <td className="description" style={{ paddingLeft: '20px' }}>$ {Total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>


      <Card className="row p-4 my-4">
        <div className="container">
          <p><b>Estado de la orden </b></p>
          <Stepper className="stepper" alternativeLabel nonLinear activeStep={activeStep}>
            {orderStatus.map((label, index) => {
              const stepProps = {}
              const buttonProps = {};
              return (
                <Step key={index} {...stepProps}>
                  <StepButton
                    onClick={handleStep(index)}
                    completed={completed[index]}
                    {...buttonProps}
                  >
                    {label}
                  </StepButton>
                </Step>
              );
            })}
          </Stepper>
        </div>
      </Card>

      <Card className="row p-2 my-4">
          <p><b> Productos de la orden</b> </p>
          <div style={{ maxHeight: '500px', overflowY: 'scroll', width: '100%' }}>
            {
              ProductList.map((product) => {
                return <OrderProduct key={product.Id} product={product} />;
              })
            }
          </div>
      </Card>

      {
        activeStep !== 4 ? "" :
          <Card className="row p-4 my-4">
            <div className="container">
              <p><b> Califica la orden </b></p>
              <Rating
                name="rating"
                value={rating}
                onChange={(event, newValue) => {
                  rateOrder(user?.AccessToken, Id, rating);
                  setRating(newValue);
                }}
              />
            </div>
          </Card>
      }

    </div>;

  return (isLoading ? loader : content);
  // #endregion render.

}

// #region redux.
const mapStateToProps = (state) => ({
  user: state.UserSession,
  isLoading: state.IsAccountProcessLoading,
  order: state.AccountOrder,
});
// #endregion redux.

export default connect(mapStateToProps)(OrderDetail);