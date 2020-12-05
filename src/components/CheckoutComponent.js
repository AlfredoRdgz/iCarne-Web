// Created by Alfredo Rodriguez.
// <summary>
// CheckoutComponent will render the summary of the cart, as well as provide the necessary forms a user must fill to complete the order.
// </summary>
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import CartProduct from './CartProductComponent';
import { Card, TextField, Button, Breadcrumbs, RadioGroup, FormControlLabel, Radio, Modal, Fade, Backdrop, IconButton } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { loadAccountAddresses, loadAccountContactInformation } from '../redux/thunks/AccountThunks';
import { loadStores } from '../redux/thunks/StoreThunks';
import { clearCart, updateCartTotal } from '../redux/actions/OrderActions';
import { Create } from '@material-ui/icons';
import CheckoutModalContent from './CheckoutModalContentComponent';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { Constants } from './Constants';
import { Alert } from '@material-ui/lab';
import { addOrder } from '../redux/viewmodels/Order';
registerLocale("es", es);

function Checkout({ cart, cartTotal, user, contactInformation, loadContactInfo, addresses, loadAddresses, stores, loadStores, updateTotalPrice, clearCart }) {

  // #region  private properties.
  const { ModalType, DeliveryType, PaymentType, PayPalStateCodes, UrlEndpoints } = Constants;
  const paypalRef = useRef();
  const history = useHistory();
  // #endregion private properties.

  // #region public properties.
  const [storeList, setStoreList] = React.useState(stores || []);
  const [selectedStore, setSelectedStore] = React.useState(storeList[0] || {});
  const [addressList, setAddressList] = React.useState(addresses || []);
  const [selectedAddress, setSelectedAddress] = React.useState(addressList[0] || {});
  const [deliveryType, setDeliveryType] = React.useState(DeliveryType.DELIVERY);
  const [paymentType, setPaymentType] = React.useState(PaymentType.CARD);
  const [tipPercentage, setTipPercentage] = React.useState(cartTotal.tipPercentage.toString() || "0");

  const [openModal, setOpenModal] = React.useState(false);
  const [modalType, setModalType] = React.useState(ModalType.CONTACT);

  const [name, setName] = React.useState(contactInformation?.Name || "");
  const [surname, setSurname] = React.useState(contactInformation?.Surname || "");
  const [email, setEmail] = React.useState(contactInformation?.Email || "");
  const [phone, setPhone] = React.useState(contactInformation?.Phone || "");
  const [address, setAddress] = React.useState(selectedAddress?.Address || "");
  const [neighborhood, setNeighborhood] = React.useState(selectedAddress?.Neighborhood || "");
  const [zip, setZip] = React.useState(selectedAddress?.ZIP || "");
  const [country, setCountry] = React.useState(selectedAddress?.Country || "");
  const [state, setState] = React.useState(selectedAddress?.State || "");
  const [city, setCity] = React.useState(selectedAddress?.City || "");
  const [deliveryDate, setDeliveryDate] = React.useState(minDate());
  const [isValidForm, setIsValidForm] = React.useState(false);
  const [validationErrorDescription, setValidationErrorDescription] = React.useState("");
  // #endregion public properties.

  // #region public methods
  const updateName = (event) => {
    setName(event.target.value);
  }

  const updateSurname = (event) => {
    setSurname(event.target.value);
  }

  const updateEmail = (event) => {
    setEmail(event.target.value);
  }

  const updatePhone = (event) => {
    setPhone(event.target.value);
  }

  const updateAddress = (event) => {
    setAddress(event.target.value);
  }

  const updateNeighborhood = (event) => {
    setNeighborhood(event.target.value);
  }

  const updateZip = (event) => {
    if (event.target.value.length <= 5) {
      setZip(event.target.value);
    }
  }

  const updateCountry = (event) => {
    setCountry(event.target.value);
  }

  const updateState = (event) => {
    setState(event.target.value);

  }
  const updateCity = (event) => {
    setCity(event.target.value);
  }

  const updatePaymentType = (event) => {
    let number = event.target.value;
    setPaymentType(number);
  }

  const updateDeliveryType = (event) => {
    let number = event.target.value;
    setDeliveryType(number);
  }

  const updateTipPercent = (event) => {
    let number = event.target.value;
    setTipPercentage(number);
    updateTotalPrice(cart, Number(number));
  }

  const updateDeliveryDate = (date) => {
    if (date.getTime() < Date.now()) {
      alert("La hora seleccionada no es válida ya que es una hora pasada.");
    } else {
      setDeliveryDate(date);
    }
  }

  const handleSelectedAddress = (event) => {
    let address = addressList.find((address) => address.Id === Number(event.target.value));
    setSelectedAddress(address || {});
    setAddress(address?.Address || "");
    setNeighborhood(address?.Neighborhood || "");
    setZip(address?.ZIP || "");
    setCountry(address?.Country || "");
    setState(address?.State || "");
    setCity(address?.City || "");
  };

  const handleSelectedStore = (event) => {
    let store = storeList.find((store) => store.Id === Number(event.target.value));
    setSelectedStore(store || {});
  };

  const handleOpenModal = (modalType) => {
    setOpenModal(true);
    setModalType(modalType);
  }

  const closeModal = (event) => {
    setOpenModal(false);
  }

  const submitOrder = async () => {
    try {
      const orderInformation = {
        name: name + " " + surname,
        email: email,
        phone: phone,
        deliveryTypeId: deliveryType,
        address: address,
        neighborhood: neighborhood,
        zip: zip,
        city: city,
        state: state,
        country: country,
        storeId: selectedStore.Id,
        paymentTypeId: paymentType,
        paypalReferenceId: null,
        deliveryDate: deliveryDate,
        tipPercentage: tipPercentage
      };
      await addOrder(user?.AccessToken, orderInformation, cart, cartTotal);
      alert("La orden se ha guardado correctamente.");
      clearCart();
      history.push(UrlEndpoints.accountOrders);
    } catch (error) {
      alert(error);
    }
  }
  // #endregion public methods

  // #region private methods
  function validateDate(date) {
    let d = new Date();
    d.setDate(d.getDate() + 15);
    return date.getTime() <= d.getTime();
  }

  function validateTime(date) {
    // Defaults to delivery times.
    let startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9, 0, 0, 0);
    let endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 21, 0, 0, 0);
    // If deliveryType is pickup then the time is taken from the store.
    if (deliveryType === DeliveryType.PICKUP) {
      let day = date.getDay();
      if (day === 0) {
        startTime.setHours(Number(selectedStore.SundayStartTime.split(":")[0]));
        endTime.setHours(Number(selectedStore.SundayEndTime.split(":")[0]));
        if (Number(selectedStore.SundayEndTime.split(":")[1]) > 0) {
          endTime.setMinutes(Number(selectedStore.SundayEndTime.split(":")[1]) - 15);
        } else {
          endTime.setMinutes(-15);
        }
      } else {
        startTime.setHours(Number(selectedStore.WeekStartTime.split(":")[0]));
        endTime.setHours(Number(selectedStore.WeekEndTime.split(":")[0]));
        if (Number(selectedStore.WeekEndTime.split(":")[1]) > 0) {
          endTime.setMinutes(Number(selectedStore.WeekEndTime.split(":")[1]) - 15);
        } else {
          endTime.setMinutes(-15);
        }
      }
    }
    return date.getTime() >= startTime.getTime() && date.getTime() <= endTime.getTime();
  }

  function minDate() {
    let now = new Date();
    now.setMinutes(Math.ceil(now.getMinutes() / 15) * 15);
    // Defaults to delivery times.
    let referenceStartTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0, 0);
    let referenceEndTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 0, 0, 0);
    // If deliveryType is pickup then the end time is taken from the store.
    if (deliveryType === DeliveryType.PICKUP) {
      if (now.getDay() === 0) {
        referenceStartTime.setHours(Number(selectedStore.SundayStartime.split(":")[0]));
        referenceEndTime.setHours(Number(selectedStore.SundayEndTime.split(":")[0]));
        if (Number(selectedStore.SundayEndTime.split(":")[1]) > 0) {
          referenceEndTime.setMinutes(Number(selectedStore.SundayEndTime.split(":")[1]) - 15);
        } else {
          referenceEndTime.setMinutes(-15);
        }
      } else {
        referenceStartTime.setHours(Number(selectedStore.WeekStartTime.split(":")[0]));
        referenceEndTime.setHours(Number(selectedStore.WeekEndTime.split(":")[0]));
        if (Number(selectedStore.WeekEndTime.split(":")[1]) > 0) {
          referenceEndTime.setMinutes(Number(selectedStore.WeekEndTime.split(":")[1]) - 15);
        } else {
          referenceEndTime.setMinutes(-15);
        }
      }
    }
    if (now.getTime() > referenceEndTime.getTime()) {
      now.setDate(now.getDate() + 1);
      now.setHours(referenceStartTime.getHours());
      now.setMinutes(0);
    }
    return now;
  }

  function updateContact(contactInformation) {
    setName(contactInformation?.Name || "");
    setSurname(contactInformation?.Surname || "");
    setEmail(contactInformation?.Email || "");
    setPhone(contactInformation?.Phone || "");
  }

  function updateAddressList(addressList) {
    setAddressList(addressList);
    let firstAddress = addressList[0];
    if (firstAddress) {
      setSelectedAddress(firstAddress);
      setAddress(firstAddress.Address);
      setNeighborhood(firstAddress.Neighborhood);
      setZip(firstAddress.ZIP);
      setCountry(firstAddress.Country);
      setState(firstAddress.State);
      setCity(firstAddress.City);
    }
  }

  function updateStoresList(storeList) {
    setStoreList(storeList);
    setSelectedStore(storeList[0] || {});
  }

  const loadPaypalRef = () => {
    if (window.myButton) {
      window.myButton.close();
    }
    window.myButton = window.paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'blue',
        label: 'checkout',
        height: 40
      },
      createOrder: (data, actions, error) => {
        return actions.order.create({
          intent: "CAPTURE",
          payer: getPayerInfo(),
          purchase_units: getOrderUnits()
        });
      },
      onApprove: async (data, actions) => {
        try {
          const order = await actions.order.capture();
          const orderInformation = {
            name: name + " " + surname,
            email: email,
            phone: phone,
            deliveryTypeId: deliveryType,
            address: address,
            neighborhood: neighborhood,
            zip: zip,
            city: city,
            state: state,
            country: country,
            storeId: selectedStore.Id,
            paymentTypeId: paymentType,
            paypalReferenceId: order.id,
            deliveryDate: deliveryDate,
            tipPercentage: tipPercentage
          };
          await addOrder(user?.AccessToken, orderInformation, cart, cartTotal);
          alert("La orden se ha guardado correctamente.");
          clearCart();
          history.push(UrlEndpoints.accountOrders);
        } catch (error) {
          alert("Error al guardar la orden. Favor de asegurarse que la cuenta ingresada en nuestro sistema sea la misma que se utiliza con PayPal.");
        }
      },
      onError: (err) => {
        alert("El pago fue rechazado. Intente con otra tarjeta o seleccione la opción de pago en efectivo.");
      }
    });
    window.myButton.render(paypalRef.current);
  }

  const validateForm = () => {
    let errorFlag = false;
    let errorMessage = "Para poder completar su orden resuelva los siguientes errores:\n";
    if (!name) {
      errorMessage += "- Ingrese un nombre.\n";
      errorFlag = true;
    }

    if (!surname) {
      errorMessage += "- Ingrese un apellido.\n";
      errorFlag = true;
    }

    if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(email)) {
      errorMessage += "- El correo no es válido.\n";
      errorFlag = true;
    }

    if (phone.length !== 10) {
      errorMessage += "- Ingrese un teléfono sin espacios en formato 10 dígitos.\n";
      errorFlag = true;
    }

    if (deliveryType === DeliveryType.DELIVERY) {
      if (!address) {
        errorMessage += "- Ingrese una dirección.\n";
        errorFlag = true;
      }
      if (!neighborhood) {
        errorMessage += "- Ingrese una colonia.\n";
        errorFlag = true;
      }
      if (!zip) {
        errorMessage += "- Ingrese un código postal.\n";
        errorFlag = true;
      }
      if (!state || state !== "Jalisco") {
        errorMessage += "- Ingrese un estado válido. Actualmente sólo se permiten envíos dentro de Jalisco.\n";
        errorFlag = true;
      }
      if (!city) {
        errorMessage += "- Ingrese una ciudad.\n";
        errorFlag = true;
      }
      if (!country) {
        errorMessage += "- Ingrese un país.\n";
        errorFlag = true;
      }
    } else if (deliveryType === DeliveryType.PICKUP) {
      if (!selectedStore?.Name) {
        errorMessage += "- Seleccione una tienda de entrega.\n";
        errorFlag = true;
      }
    }
    if (!deliveryDate) {
      errorMessage += "- Seleccione una fecha de entrega.\n";
      errorFlag = true;
    }

    if (errorFlag) {
      setValidationErrorDescription(errorMessage);
      return false;
    }
    // All validations passed.
    loadPaypalRef();
    return true;
  };

  const getPayerInfo = () => {
    const payerInfo = {
      name: {
        given_name: name,
        surname: surname,
      },
      email_address: email,
      phone: {
        phone_type: 'MOBILE',
        phone_number: {
          national_number: phone
        }
      },
      address: {
        address_line_1: address,
        address_line_2: neighborhood,
        admin_area_1: PayPalStateCodes[state],
        admin_area_2: city,
        postal_code: zip.toString(),
        country_code: 'MX'
      }
    };

    return payerInfo;
  }

  const getOrderUnits = () => {
    const orderUnits = cart.map((product) => {
      const { Name, Amount, WholesaleAmount, WholesalePrice, Price } = product;
      return {
        name: Name,
        quantity: Amount,
        unit_amount: {
          currency_code: "MXN",
          value: Number(((Amount >= WholesaleAmount) ? (WholesalePrice) : (Price)).toFixed(2))
        }
      }
    });
    // Adding tip if any.
    if (Number((cartTotal.subtotal * tipPercentage).toFixed(2)) > 0) {
      orderUnits.push({
        name: "Propina",
        quantity: 1,
        unit_amount: {
          currency_code: "MXN",
          value: Number((cartTotal.subtotal * tipPercentage).toFixed(2))
        }
      });
    }
    return [{
      amount: {
        currency_code: "MXN",
        value: Number(cartTotal.total.toFixed(2)),
        breakdown: {
          item_total: {
            currency_code: "MXN",
            value: Number(cartTotal.total.toFixed(2)),
          }
        }
      },
      items: orderUnits,
      shipping: {
        name: {
          full_name: name + " " + surname
        },
        address: {
          address_line_1: address,
          address_line_2: neighborhood,
          admin_area_1: PayPalStateCodes[state],
          admin_area_2: city,
          postal_code: zip.toString(),
          country_code: 'MX'
        }
      }
    }];
};

useEffect(() => {
  if (addresses.length === 0) {
    loadAddresses(user?.AccessToken);
  }
  if (stores.length === 0) {
    loadStores();
  }
  if (!contactInformation?.Name) {
    loadContactInfo(user?.AccessToken);
  }
}, [user]);

useEffect(() => {
  updateTotalPrice(cart);
}, [cart])

useEffect(() => {
  updateContact(contactInformation);
}, [contactInformation]);

useEffect(() => {
  updateAddressList(addresses);
}, [addresses]);

useEffect(() => {
  updateStoresList(stores);
}, [stores]);

useEffect(() => {
  setIsValidForm(validateForm());
}, [name, surname, email, phone, address, neighborhood, city, state, country, zip, deliveryType, selectedStore, deliveryDate, tipPercentage]);

useEffect(() => {
  setDeliveryDate(minDate());
}, [deliveryType, selectedStore]);
// #endregion private methods.

// #region render.
return (
  <div className="container p-4">

    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" to={UrlEndpoints.cart}>
        Carrito
        </Link>
      <Link to="#" color="secondary">
        Checkout
        </Link>
    </Breadcrumbs>

    <h1 className="text-center">Resumen de la compra</h1>

    <Card className="row my-2" style={{ padding: '20px', overflow: 'visible' }}>

      {/* CART OVERVIEW */}
      <div className="col-12 col-lg-4">

        <h5 className="text-center my-2">Artículos por comprar </h5>

        <div className="my-4" style={{ overflowY: 'scroll', maxHeight: '500px' }}>
          {
            cart.map((product) => {
              return <CartProduct key={product.Id} product={product} editable={false} />
            })
          }
        </div>

        <div className="my-4" style={{ border: '2px solid var(--primary)', padding: '10px' }}>
          <h3 className="text-center">Desglose de costo</h3>
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td>Subtotal: </td>
                <td>${cartTotal.subtotal.toFixed(2)}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--secondary)' }}>
                <td>Propina:</td>
                <td>${(cartTotal.subtotal * tipPercentage).toFixed(2)}</td>
              </tr>
              <tr>
                <td><b style={{ color: 'var(--secondary)' }}>Total:</b></td>
                <td><b style={{ color: 'var(--secondary)' }}>${cartTotal.total.toFixed(2)}</b></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* CUSTOMER INFORMATION */}
      <div className="col-12 col-lg-8">
        <h5> Datos de contacto </h5>
        <div className="row">
          <div className="col-10">
            <p className="description">Nombre(s): {name}</p>
            <p className="description">Apellido(s): {surname}</p>
            <p className="description">Correo Electrónico: {email}</p>
            <p className="description">Teléfono (10 dígitos): {phone}</p>
          </div>
          <div className="col-2">
            <IconButton type="button" color="secondary" onClick={() => handleOpenModal(ModalType.CONTACT)}>
              <Create />
            </IconButton>
          </div>
        </div>

        <hr />

        <h5> Datos de entrega </h5>

        <div className="row">
          <div className="col-10">
            {
              deliveryType === DeliveryType.DELIVERY ?
                (
                  <div>
                    <p className="description">Tipo de entrega: Servicio a domicilio</p>
                    <div>
                      <p className="description">Dirección: {address}</p>
                      <p className="description">Colonia: {neighborhood}</p>
                      <p className="description">Código Postal: {zip}</p>
                      <p className="description">Ciudad: {city}</p>
                      <p className="description">Estado: {state}</p>
                      <p className="description">País: {country}</p>
                    </div>
                  </div>
                ) :
                (
                  <div>
                    <p className="description">Tipo de entrega: Recoger en tienda</p>
                    <p className="description">Tienda seleccionada:</p>
                    <p className="description">{selectedStore.Name}</p>
                    <p className="description">{selectedStore.Address}, {selectedStore.Neighborhood}, {selectedStore.ZIP}</p>
                    <p className="description">{selectedStore.City}, {selectedStore.State}, {selectedStore.Country}</p>
                  </div>
                )
            }
          </div>
          <div className="col-2">
            <IconButton type="button" color="secondary" onClick={() => handleOpenModal(ModalType.ADDRESS)}>
              <Create />
            </IconButton>
          </div>
        </div>

        <hr />

        <h5> Datos de pago </h5>
        <div className="row">
          <div className="col-10">
            <p className="description">Método de pago: {paymentType === PaymentType.CARD ? "Tarjeta" : "Efectivo"}</p>
          </div>
          <div className="col-2">
            <IconButton type="button" color="secondary" onClick={() => handleOpenModal(ModalType.PAYMENT)}>
              <Create />
            </IconButton>
          </div>
        </div>

        <hr />

        <h5>Propina</h5>
        <RadioGroup row value={tipPercentage} onChange={updateTipPercent}>
          <FormControlLabel value="0" control={<Radio />} label="0%" />
          <FormControlLabel value="0.05" control={<Radio />} label="5%" />
          <FormControlLabel value="0.10" control={<Radio />} label="10%" />
          <FormControlLabel value="0.15" control={<Radio />} label="15%" />
        </RadioGroup>

        <hr />

        <h5>Programa tu entrega</h5>
        <DatePicker
          selected={deliveryDate}
          onChange={updateDeliveryDate}
          filterDate={validateDate}
          filterTime={validateTime}
          showTimeSelect
          minDate={minDate()}
          popperPlacement="top-start"
          placeholderText="Fecha de entrega"
          dateFormat="dd/MM/yyyy h:mm aa"
          locale="es"
          timeIntervals={15}
          style={{ zIndex: 1000 }}
        />
      </div>

      {
        !isValidForm ?
          <div className="flex" style={{ width: '100%', margin: '20px auto' }}>
            <Alert severity="error" style={{ margin: '20px auto' }}>
              {
                validationErrorDescription.split('\n').map(i => {
                  return <p key={i}>{i}</p>
                })
              }
            </Alert>
          </div> : ""
      }

      <div id="localPaypalContainer" className="my-2" style={{ display: paymentType === PaymentType.CARD && isValidForm ? 'flex' : 'none' }} ref={paypalRef}></div>

      {paymentType === PaymentType.CASH && isValidForm ?
        <div className="flex" style={{ width: '100%', margin: '20px auto' }}>
          <Button onClick={submitOrder} variant="contained" color="secondary" style={{ margin: '20px auto' }}> Confirmar orden</Button>
        </div> : ""
      }

    </Card>

    <Modal
      className="modal-view"
      open={openModal}
      onClose={closeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModal}>
        <CheckoutModalContent
          selectedAddress={selectedAddress}
          handleSelectedAddress={handleSelectedAddress}
          addressList={addressList}
          selectedStore={selectedStore}
          handleSelectedStore={handleSelectedStore}
          storeList={storeList}
          modalType={modalType}
          closeModal={closeModal}
          name={name}
          surname={surname}
          email={email}
          phone={phone}
          address={address}
          neighborhood={neighborhood}
          zip={zip}
          country={country}
          state={state}
          city={city}
          updateName={updateName}
          updateSurname={updateSurname}
          updateEmail={updateEmail}
          updatePhone={updatePhone}
          updateAddress={updateAddress}
          updateNeighborhood={updateNeighborhood}
          updateZip={updateZip}
          updateCountry={updateCountry}
          updateState={updateState}
          updateCity={updateCity}
          paymentType={paymentType}
          updatePaymentType={updatePaymentType}
          deliveryType={deliveryType}
          updateDeliveryType={updateDeliveryType}
        />
      </Fade>
    </Modal>

  </div>
);
  // #endregion render.
}

// #region redux.
const mapStateToProps = state => ({
  user: state.UserSession,
  cart: state.Cart,
  cartTotal: state.CartTotal,
  contactInformation: state.AccountContactInformation,
  addresses: state.AccountAddressesList,
  stores: state.StoreList
});

const mapDispatchToProps = dispatch => ({
  loadStores: () => dispatch(loadStores()),
  loadAddresses: (accessToken) => dispatch(loadAccountAddresses(accessToken)),
  loadContactInfo: (accessToken) => dispatch(loadAccountContactInformation(accessToken)),
  updateTotalPrice: (cart, tipPercentage) => dispatch(updateCartTotal(cart, tipPercentage)),
  clearCart: () => dispatch(clearCart())
});
// #endregion redux.

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);