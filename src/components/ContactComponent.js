// Created by Alfredo Rodriguez.
// <summary>
// ContactUs will render a list of the stores, as well as the information to send email for any inquiry the user might have.
// </summary>
import { Button } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadStores } from '../redux/thunks/StoreThunks';

function ContactUs({ stores, loadStores }) {

  const [storeList, setStoreList] = React.useState(stores || []);

  useEffect(() => {
    if (stores.length === 0) {
      loadStores();
    }
  }, []);

  useEffect(() => {
    setStoreList(stores);
  }, [stores]);

  // #region render.
  return (
    <div className="container">
      <h1 className="text-center">Contacto</h1>

      <div className="row">

        <div className="my-2">
          <p className="text-center my-2">Para cualquier duda puede escribir al siguiente correo de contacto: </p>
          <p className="text-center my-2"><a href="mailto:info@carnessupremaslapaz.com" target="_blank">
            info@carnessupremaslapaz.com</a> </p>

          <div className="my-2" style={{ width: '100%' }}>
            <iframe src="https://www.atlistmaps.com/map/04d547a0-733d-49e4-b5ff-a4896d145f1a?share=true" allow="geolocation" width="100%" height="400px" frameborder="0" scrolling="no" allowfullscreen>
            </iframe>
          </div>

          <h2 className="text-center my-2"> Sucursales</h2>
          <ul className="two-columns-list stores-list">
            {
              storeList.map((store) => {
                return (
                  <li key={store.Id}>
                    <h5 style={{ textTransform: 'uppercase', color: '#9B1C1E' }}>{store.Name}</h5>
                    <ul className="stores-list">
                      <li><b>Teléfono:</b> {store.Phone}</li>
                      <li><b>Domicilio:</b> {store.Address}, {store.Neighborhood}, {store.City}</li>
                      <li>
                        <b>Horario:</b>
                        <ul>
                          <li>Lunes a sábado: {store.WeekStartTime} - {store.WeekEndTime}</li>
                          <li>Domingo: {store.SundayStartTime} - {store.SundayEndTime} </li>
                        </ul>
                      </li>
                    </ul>
                  </li>);
              })
            }
          </ul>
        </div>
      </div>

    </div>
  );
  // #endregion render.
}
// #region redux.
const mapStateToProps = state => ({
  stores: state.StoreList
});

const mapDispatchToProps = dispatch => ({
  loadStores: () => dispatch(loadStores()),
});
// #endregion redux.

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
