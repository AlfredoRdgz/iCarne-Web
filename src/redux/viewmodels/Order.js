// #region private properties
const fetch = require('node-fetch');
const clientId = 1;
const baseUrl = 'https://ws.carnessupremaslapaz.com';
const ORDER_STATUS_APPROVED = 2;
// # endregion private properties

export const addOrder = (accessToken, orderInformation, cart, cartTotal) => {
    return new Promise(async (resolve, reject) => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'ClientId': clientId
                },
                body: JSON.stringify({
                    statusId: ORDER_STATUS_APPROVED,
                    shippingName: orderInformation.name,
                    shippingEmail: orderInformation.email,
                    shippingPhone: orderInformation.phone,
                    deliveryTypeId: orderInformation.deliveryTypeId,
                    address: orderInformation.address,
                    neighborhood: orderInformation.neighborhood,
                    zip: orderInformation.zip,
                    city: orderInformation.city,
                    state: orderInformation.state,
                    country: orderInformation.country,
                    storeId: orderInformation.storeId,
                    paymentTypeId: orderInformation.paymentTypeId,
                    paypalReferenceId: orderInformation.paypalReferenceId,
                    deliveryDate: orderInformation.deliveryDate,
                    subtotal: cartTotal.subtotal.toFixed(2),
                    tip: (cartTotal.subtotal * orderInformation.tipPercentage).toFixed(2),
                    total: cartTotal.total.toFixed(2),
                    productList: cart.map(product => {
                        const { Id, Amount, WholesaleAmount, WholesalePrice, Price } = product;
                        return {
                            id: Id,
                            amount: Amount,
                            subtotal: Number(((Amount >= WholesaleAmount) ? (WholesalePrice * Amount) : (Price * Amount)).toFixed(2))
                        }
                    })
                })
            };

            const response = await fetch(`${baseUrl}/order`, options);
            const result = await response.json();
            if (response.status === 201) {
                resolve(result.Message);
            } else {
                reject(result.Message);
            }
        } catch (error) {
            reject(error);
        }
    });
};

export const updateOrderStatus = (accessToken, orderId, statusId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'ClientId': clientId
                },
                body: JSON.stringify({
                    orderId: orderId,
                    statusId: statusId,
                })
            };

            const response = await fetch(`${baseUrl}/order/status`, options);
            const result = await response.json();
            if (response.status === 200) {
                resolve(result);
            } else {
                reject(result.Message);
            }
        } catch (error) {
            reject(error);
        }
    });
};

export const rateOrder = (accessToken, orderId, rating) => {
    return new Promise(async (resolve, reject) => {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'ClientId': clientId
                },
                body: JSON.stringify({
                    orderId: orderId,
                    rating: rating,
                })
            };

            const response = await fetch(`${baseUrl}/order/rating`, options);
            const result = await response.json();
            if (response.status === 200) {
                resolve(result);
            } else {
                reject(result.Message);
            }
        } catch (error) {
            reject(error);
        }

    });
};