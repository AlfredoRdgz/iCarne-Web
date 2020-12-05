// Created by Alfredo Rodriguez.
// <summary>
// AdminStoreEditComponent will provide capabilities to let admins edit one of their stores.
// </summary>
import React, { useEffect } from 'react';
import { Card, TextField, Button, Select, InputLabel, FormControl, InputAdornment, Breadcrumbs, IconButton } from '@material-ui/core';
import { connect } from 'react-redux';
import { addStore, updateStore } from '../redux/viewmodels/Store';
import { Link, useHistory } from 'react-router-dom';
import { Constants } from './Constants';
import { Save } from '@material-ui/icons';
const UrlEndpoints = Constants.UrlEndpoints;
const ValidationMessages = Constants.ValidationMessages;

function AdminStoreEdit({ user, store }) {
    // #region private properties.
    const history = useHistory();
    const { Id, Name, Address, Neighborhood, ZIP, City, State, Country, Phone, SundayStartTime, SundayEndTime, WeekStartTime, WeekEndTime } = store || {};
    // #endregion private properties.

    // #region public properties.
    const [storeName, setStoreName] = React.useState(Name || "");
    const [storeAddress, setStoreAddress] = React.useState(Address || "");
    const [storeNeighborhood, setStoreNeighborhood] = React.useState(Neighborhood || "");
    const [storeZIP, setStoreZIP] = React.useState(ZIP || "");
    const [storeCity, setStoreCity] = React.useState(City || "");
    const [storeState, setStoreState] = React.useState(State || "");
    const [storeCountry, setStoreCountry] = React.useState(Country || "");
    const [storePhone, setStorePhone] = React.useState(Phone || "");
    const [storeSundayStartTime, setStoreSundayStartTime] = React.useState(SundayStartTime || "");
    const [storeSundayEndTime, setStoreSundayEndTime] = React.useState(SundayEndTime || "");
    const [storeWeekStartTime, setStoreWeekStartTime] = React.useState(WeekStartTime || "");
    const [storeWeekEndTime, setStoreWeekEndTime] = React.useState(WeekEndTime || "");
    // #endregion public properties.

    // #region public methods.
    const handleSaveStore = async (event) => {
        event.preventDefault();
        try {
            let newStoreData = {
                name: storeName,
                address: storeAddress,
                neighborhood: storeNeighborhood,
                zip: storeZIP,
                city: storeCity,
                state: storeState,
                country: storeCountry,
                phone: storePhone,
                weekStartTime: storeWeekStartTime,
                weekEndTime: storeWeekEndTime,
                sundayStartTime: storeSundayStartTime,
                sundayEndTime: storeSundayEndTime
            };

            if (Id) {
                await updateStore(user?.AccessToken, Id, newStoreData);
            } else {
                await addStore(user?.AccessToken, newStoreData);
            }
            alert('Tienda guardada con éxito.');
            history.push(UrlEndpoints.accountStores);
        } catch (error) {
            alert(error);
        }
    }
    // #endregion public methods.

    // #region private methods.
    useEffect(() => {
        // Add validation messages.
        let inputs = document.getElementsByTagName('input');
        for (let input of inputs) {
            input.addEventListener('invalid', (event) => {
                const target = event.target;
                target.setCustomValidity(ValidationMessages[target.id]);
            });
            input.addEventListener('input', (event) => {
                event.target.setCustomValidity('');
            });
        }
    }, []);
    // #endregion private methods.

    // #region render.
    return (
        <div className="container p-4">

            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" to={UrlEndpoints.account}>Mi cuenta </Link>
                <Link color="inherit" to={UrlEndpoints.accountStores}>Mis sucursales</Link>
                <Link to="#" color="secondary">Editar sucursal</Link>
            </Breadcrumbs>

            <h1 className="text-center my-4"> Editar sucursal </h1>
            <Card className="p-4" style={{ borderRadius: '20px' }}>
                <form className="row" onSubmit={handleSaveStore}>
                    <div className="col-12 my-4">
                        <TextField fullWidth required id="storeName" variant="outlined" label="Nombre de la tienda" value={storeName}
                            onChange={(event) => { setStoreName(event.target.value); }} />
                    </div>
                    <div className="col-12 col-md-6 my-4">
                        <TextField fullWidth required id="address" variant="outlined" label="Dirección" value={storeAddress}
                            onChange={(event) => { setStoreAddress(event.target.value); }} />
                    </div>
                    <div className="col-12 col-md-6 my-4">
                        <TextField fullWidth required id="neighborhood" variant="outlined" label="Colonia" value={storeNeighborhood}
                            onChange={(event) => { setStoreNeighborhood(event.target.value); }} />
                    </div>
                    <div className="col-12 col-md-6 my-4">
                        <TextField fullWidth required id="city" variant="outlined" label="Ciudad" value={storeCity}
                            onChange={(event) => { setStoreCity(event.target.value); }} />
                    </div>
                    <div className="col-12 col-md-6 my-4">
                        <TextField fullWidth required id="city" variant="outlined" label="Estado" value={storeState}
                            onChange={(event) => { setStoreState(event.target.value); }} />
                    </div>
                    <div className="col-12 col-md-6 my-4">
                        <TextField fullWidth required id="country" variant="outlined" label="País" value={storeCountry}
                            onChange={(event) => { setStoreCountry(event.target.value); }} />
                    </div>
                    <div className="col-12 col-md-6 my-4">
                        <TextField id="zip" required variant="outlined" label="Código Postal" type="number" value={storeZIP}
                            onChange={(event) => { setStoreZIP(event.target.value); }} />
                    </div>

                    <div className="col-12 my-4">
                        <TextField id="phone" required variant="outlined" label="Teléfono" value={storePhone}
                            onChange={(event) => { setStorePhone(event.target.value); }} />
                    </div>

                    <div className="col-12 col-md-6 my-4">
                        <TextField fullWidth required id="sundayStart" variant="outlined" label="Hora inicio domingos" type="time" value={storeSundayStartTime}
                            onChange={(event) => { setStoreSundayStartTime(event.target.value); }} />
                    </div>
                    <div className="col-12 col-md-6 my-4">
                        <TextField fullWidth required id="sundayEnd" variant="outlined" label="Hora fin domingos" type="time" value={storeSundayEndTime}
                            onChange={(event) => { setStoreSundayEndTime(event.target.value); }} />
                    </div>
                    <div className="col-12 col-md-6 my-4">
                        <TextField fullWidth required id="weekStart" variant="outlined" label="Hora inicio entre semana" type="time" value={storeWeekStartTime}
                            onChange={(event) => { setStoreWeekStartTime(event.target.value); }} />
                    </div>
                    <div className="col-12 col-md-6 my-4">
                        <TextField fullWidth required id="weekEnd" variant="outlined" label="Hora fin entre semana" type="time" value={storeWeekEndTime}
                            onChange={(event) => { setStoreWeekEndTime(event.target.value); }} />
                    </div>
                    <div className="col-12 my-4 flex">
                        <Button style={{ margin: '10px auto' }} type="submit" color="secondary" variant="contained" startIcon={<Save />}>
                            Guardar
                        </Button>
                    </div>
                </form>

            </Card>
        </div>
    );
    // #endregion render.

}

// #endregion redux.
const mapStateToProps = (state) => ({
    user: state.UserSession,
    store: state.SelectedStore
});
// #endregion redux.


export default connect(mapStateToProps)(AdminStoreEdit);