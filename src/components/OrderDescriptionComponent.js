// Created by Alfredo Rodriguez.
// <summary>
// OrderDescriptionComponent file lists all the orders created by the account or if admin lists all orders.
// </summary>
import React from 'react';
import { Card, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAccountOrderDetail } from '../redux/thunks/AccountThunks';
import { Constants } from './Constants';
const UrlEndpoints = Constants.UrlEndpoints;

function OrderDescription({ user, order, getOrderDetail }) {
    // #region private properties.
    const history = useHistory();
    const { DeliveryType, PaymentType } = Constants;
    const { Id, DeliveryDate, DeliveryTypeId, PaymentTypeId, Total,
        Address, Neighborhood, City, StoreName } = order;
    // #endregion private properties.

    // #region public methods.
    const handler = async () => {
        try {
            await getOrderDetail(user?.AccessToken, Id);
            history.push(UrlEndpoints.accountOrderDetail);
        } catch (error) {
            alert(error);
        }
    }
    // #region public methods.

    // #region private methods.
    const formatDate = (date) => {
        date = new Date(date);
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0');
        var aaaa = date.getFullYear();
        var hh =  String(date.getHours()).padStart(2, '0');;
        var min =  String(date.getMinutes()).padStart(2, '0');;

        return `${dd}/${mm}/${aaaa} ${hh}:${min}`;
    }
    // #endregion private methods.

    // #region render.
    return (
        <Card className="m-4 p-4 row">
            <table className="col-12 col-md-9">
                <tbody>
                    <tr className="row">
                        <td className="col-4">Número de orden:</td>
                        <td className="col-8">{Id}</td>
                    </tr>
                    <tr className="row">
                        <td className="col-4">Fecha de entrega:</td>
                        <td className="col-8">{formatDate(DeliveryDate)}</td>
                    </tr>
                    <tr className="row">
                        <td className="col-4">Tipo de entrega:</td>
                        <td className="col-8">{DeliveryTypeId === Number(DeliveryType.DELIVERY) ? 'Entrega a domicilio' : 'Recoger en tienda'}</td>
                    </tr>
                    {
                        DeliveryTypeId === Number(DeliveryType.DELIVERY) ?
                            <tr className="row">
                                <td className="col-4">Domicilio de entrega:</td>
                                <td className="col-8">{Address}, {Neighborhood}, {City}</td>
                            </tr>
                            :
                            <tr className="row">
                                <td className="col-4">Tienda de entrega:</td>
                                <td className="col-8">{StoreName}</td>
                            </tr>
                    }
                    <tr className="row">
                        <td className="col-4">Tipo de pago:</td>
                        <td className="col-8">{PaymentTypeId === Number(PaymentType.CARD) ? 'Tarjeta' : 'Efectivo'}</td>
                    </tr>
                    <tr className="row">
                        <td className="col-4">Total de orden:</td>
                        <td className="col-8">${Total}</td>
                    </tr>
                </tbody>
            </table>
            <div className="col-12 col-md-3" style={{ display: 'flex' }}>
                <div style={{ margin: 'auto 20px auto auto' }} onClick={handler}>
                    <Button variant="contained" color="secondary">Ver detalle</Button>
                </div>
            </div>
        </Card>
    );
    // #endregion render.
}

// #region redux.
const mapStateToProps = (state, ownProps) => ({
    user: state.UserSession,
    order: ownProps.order
});

const mapDispatchToProps = dispatch => ({
    getOrderDetail: (accessToken, orderId) => dispatch(getAccountOrderDetail(accessToken, orderId))
});
// #endregion redux.

export default connect(mapStateToProps, mapDispatchToProps)(OrderDescription);