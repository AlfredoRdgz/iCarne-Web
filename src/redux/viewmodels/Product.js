// #region private properties
const fetch = require('node-fetch');
const FormData = require('form-data');
const clientId = 1;
const baseUrl = 'https://ws.carnessupremaslapaz.com';
// # endregion private properties

// #region public methods
export const getProductRating = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let options = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };

            const response = await fetch(`${baseUrl}/catalog/product/rating/${productId}`, options);
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

export const addProductRating = (productId, rating) => {
    return new Promise(async (resolve, reject) => {
        try {
            let options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId: productId,
                    rating: Math.ceil(rating),
                })
            };

            const response = await fetch(`${baseUrl}/catalog/product/rating`, options);
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


export const uploadProductImage = (accessToken, file) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = new FormData();
            data.append("image", file);
            let options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'ClientId': clientId
                },
                body: data
            };

            const response = await fetch(`${baseUrl}/image`, options);
            const result = await response.json();
            if (response.status === 201) {
                resolve(result.Url);
            } else {
                reject('Error al cargar la imagen.');
            }
        } catch (error) {
            reject('Error al cargar la imagen.');
        }

    });
};