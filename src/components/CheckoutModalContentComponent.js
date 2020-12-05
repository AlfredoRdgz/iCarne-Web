// Created by Alfredo Rodriguez.
// <summary>
// CheckoutModalContentComponent file contains all the different modal options to let the user complete the checkout.
// </summary>
import React from 'react';
import { Card, TextField, Button, FormControl, InputLabel, MenuItem, Select, FormControlLabel, RadioGroup, Radio } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import { Constants } from './Constants';

function CheckoutModalContent(props) {

    // #region private properties.
    const { ModalType, DeliveryType, PaymentType } = Constants;
    // #endregion private properties.

    // #region public properties.
    const {
        selectedAddress,
        addressList,
        selectedStore,
        storeList,
        deliveryType,
        paymentType,
        modalType,
        name,
        surname,
        email,
        phone,
        address,
        neighborhood,
        zip,
        country,
        state,
        city,
    } = props;
    // #endregion public properties.

    // #region public methods.
    const {
        handleSelectedAddress,
        handleSelectedStore,
        updateDeliveryType,
        updatePaymentType,
        closeModal,
        updateName,
        updateSurname,
        updateEmail,
        updatePhone,
        updateAddress,
        updateNeighborhood,
        updateZip,
        updateCountry,
        updateState,
        updateCity
    } = props;
    // #endregion public methods.


    // #region private methods.
    switch (modalType) {
        case ModalType.CONTACT:
            return (
                <Card className="modal-container">
                    <div style={{ margin: '10px auto' }}>
                        <TextField id="userName" label="Nombre(s)" type="text" value={name} onChange={updateName} style={{ margin: 'auto' }} />
                    </div>
                    <div style={{ margin: '10px auto' }}>
                        <TextField id="userSurname" label="Apellido(s)" type="text" value={surname} onChange={updateSurname} style={{ margin: 'auto' }} />
                    </div>
                    <div style={{ margin: '10px auto' }}>
                        <TextField id="userEmail" label="Correo electrónico" type="email" value={email} onChange={updateEmail} style={{ margin: 'auto' }} />
                    </div>
                    <div style={{ margin: '10px auto' }}>
                        <TextField id="userPhone" label="Teléfono de contacto" type="phone" value={phone} onChange={updatePhone} style={{ margin: 'auto' }} />
                    </div>
                    <Button style={{ margin: '10px auto' }} type="button" color="secondary" variant="contained" onClick={closeModal} startIcon={<Save />}>
                        Guardar
                    </Button>
                </Card>
            );
        case ModalType.ADDRESS:
            let delivery = (
                <Card className="modal-container">
                    <RadioGroup row value={deliveryType} onChange={updateDeliveryType}>
                        <FormControlLabel value={DeliveryType.DELIVERY} control={<Radio />} label="Servicio a domicilio" />
                        <FormControlLabel value={DeliveryType.PICKUP} control={<Radio />} label="Recoger en tienda" />
                    </RadioGroup>
                    {
                        addressList.length > 0 ?
                            <FormControl style={{ margin: '20px' }} variant="outlined">
                                <InputLabel htmlFor="userAddress">Domicilios guardados</InputLabel>
                                <Select id="userAddress" value={selectedAddress?.Id} onChange={handleSelectedAddress}>
                                    {
                                        addressList.map((address) => {
                                            return <MenuItem key={address.Id} value={address.Id}>{address.Address}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl> : ""
                    }
                    <div style={{ margin: '10px auto' }}>
                        <TextField id="address" label="Dirección" type="text" value={address} onChange={updateAddress} />
                    </div>
                    <div style={{ margin: '10px auto' }}>
                        <TextField id="neighborhood" label="Colonia" type="text" value={neighborhood} onChange={updateNeighborhood} />
                    </div>
                    <div style={{ margin: '10px auto' }}>
                        <TextField id="zip" label="Código Postal" type="text" value={zip} onChange={updateZip} />
                    </div>
                    <div style={{ margin: '10px auto' }}>
                        <TextField id="city" label="Ciudad" type="text" value={city} onChange={updateCity} />
                    </div>
                    <div style={{ margin: '10px auto' }}>
                        <TextField id="state" label="Estado" type="text" value={state} onChange={updateState} />
                    </div>
                    <div style={{ margin: '10px auto' }}>
                        <TextField id="country" label="País" type="text" value={country} onChange={updateCountry} />
                    </div>
                    <Button style={{ margin: '10px auto' }} type="button" color="secondary" variant="contained" onClick={closeModal} startIcon={<Save />}>
                        Guardar
                    </Button>
                </Card>
            );
            let pickup = (
                <Card className="modal-container">
                    <RadioGroup row value={deliveryType} onChange={updateDeliveryType}>
                        <FormControlLabel value={DeliveryType.DELIVERY} control={<Radio />} label="Servicio a domicilio" />
                        <FormControlLabel value={DeliveryType.PICKUP} control={<Radio />} label="Recoger en tienda" />
                    </RadioGroup>
                    <FormControl style={{ margin: '20px' }} variant="outlined" value={selectedStore}>
                        <InputLabel htmlFor="userAddress">Seleccionar tienda</InputLabel>
                        <Select id="userAddress" value={selectedStore?.Id} onChange={handleSelectedStore}>
                            {
                                storeList.map((store) => {
                                    return <MenuItem key={store.Id} value={store.Id}>{store.Name}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                    <p className="description">Tienda seleccionada:</p>
                    <p className="description">{selectedStore.Name}</p>
                    <p className="description">{selectedStore.Address}, {selectedStore.Neighborhood}, {selectedStore.ZIP}</p>
                    <p className="description">{selectedStore.City}, {selectedStore.State}, {selectedStore.Country}</p>
                    <Button style={{ margin: '10px auto' }} type="button" color="secondary" variant="contained" onClick={closeModal} startIcon={<Save />}>
                        Guardar
                    </Button>
                </Card>
            );
            return deliveryType === DeliveryType.DELIVERY ? delivery : pickup;
        case ModalType.PAYMENT:
            let cashPayment = (
                <Card className="modal-container">
                    <RadioGroup row value={paymentType} onChange={updatePaymentType}>
                        <FormControlLabel value="1" control={<Radio />} label="Tarjeta" />
                        <FormControlLabel value="2" control={<Radio />} label="Efectivo" />
                    </RadioGroup>
                    <p>Se realizará el cobro directamente en el momento de su entrega. Por seguridad nuestros repartidores no contarán con mucho cambio. Favor de contar con la cantidad más exacta posible.</p>
                    <Button style={{ margin: '10px auto' }} type="button" color="secondary" variant="contained" onClick={closeModal} startIcon={<Save />}>
                        Guardar
                    </Button>
                </Card>
            );

            let cardPayment = (
                <Card className="modal-container">
                    <RadioGroup row value={paymentType} onChange={updatePaymentType}>
                        <FormControlLabel value={PaymentType.CARD} control={<Radio />} label="Tarjeta" />
                        <FormControlLabel value={PaymentType.CASH} control={<Radio />} label="Efectivo" />
                    </RadioGroup>
                    <p>Se realizará el cobro mediante el servicio de checkout en la aplicación. Tomaremos sus datos de cuenta de manera segura al confirmar la orden.</p>
                    <Button style={{ margin: '10px auto' }} type="button" color="secondary" variant="contained" onClick={closeModal} startIcon={<Save />}>
                        Guardar
                    </Button>
                </Card>
            );
            return paymentType === PaymentType.CARD ? cardPayment : cashPayment;
        default:
            return;
    }
    // #endregion private methods.
}

export default CheckoutModalContent;