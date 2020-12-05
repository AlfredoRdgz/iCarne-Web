// #region private properties
const fetch = require('node-fetch');
const clientId = 1;
const baseUrl = 'https://ws.carnessupremaslapaz.com';
// # endregion private properties

export const addStore = (accessToken, store) => {
    return new Promise(async (resolve, reject) => {
        try {
            let options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'ClientId': clientId
                },
                body: JSON.stringify({
                    name: store.name,
                    address: store.address,
                    neighborhood: store.neighborhood,
                    zip: store.zip,
                    city: store.city,
                    state: store.sate,
                    country: store.country,
                    phone: store.phone,
                    weekStartTime: store.weekStartTime,
                    weekEndTime: store.weekEndTime,
                    sundayStartTime: store.sundayStartTime,
                    sundayEndTime: store.sundayEndTime
                })
            };

            const response = await fetch(`${baseUrl}/admin/store`, options);
            const result = await response.json();
            if (response.status === 201) {
                resolve(result);
            } else {
                reject(result.Message);
            }
        } catch (error) {
            reject(error);
        }
    });
};

export const updateStore = (accessToken, storeId, store) => {
    return new Promise(async (resolve, reject) => {
        try {
            let options = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'ClientId': clientId
                },
                body: JSON.stringify({
                    storeId: storeId,
                    name: store.name,
                    address: store.address,
                    neighborhood: store.neighborhood,
                    zip: store.zip,
                    city: store.city,
                    state: store.sate,
                    country: store.country,
                    phone: store.phone,
                    sundayStartTime: store.sundayStartTime,
                    sundayEndTime: store.sundayEndTime,
                    weekStartTime: store.weekStartTime,
                    weekEndTime: store.weekEndTime
                })
            };

            const response = await fetch(`${baseUrl}/admin/store`, options);
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

export const deleteStore = (accessToken, storeId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let options = {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'ClientId': clientId
                },
                body: JSON.stringify({
                    storeId: storeId
                })
            };

            const response = await fetch(`${baseUrl}/admin/store`, options);
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