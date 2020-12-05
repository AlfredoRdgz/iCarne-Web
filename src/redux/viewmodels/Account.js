// #region private properties
const fetch = require('node-fetch');
const clientId = 1;
const baseUrl = 'https://ws.carnessupremaslapaz.com';
// # endregion private properties

// #region public methods
export const updateBasicInfo = (accessToken, name, surname, email, phone) => {
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
                    name: name,
                    surname: surname,
                    email: email,
                    phone: phone
                })
            };

            const response = await fetch(`${baseUrl}/account/contact`, options);
            const result = await response.json();
            if (response.status === 200) {
                resolve(result.Message);
            } else {
                reject(result.Message);
            }
        } catch (error) {
            reject(error);
        }

    });
};

export const updatePassword = (accessToken, newPassword, oldPassword) => {
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
                    newPassword: newPassword,
                    oldPassword: oldPassword,
                })
            };

            const response = await fetch(`${baseUrl}/account/password`, options);
            const result = await response.json();
            if (response.status === 200) {
                resolve(result.Message);
            } else {
                reject(result.Message);
            }
        } catch (error) {
            reject(error);
        }

    });
};

// Address Information.
export const saveAddress = (accessToken, newData) => {
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
                    city: newData.City,
                    state: newData.State,
                    country: newData.Country,
                    address: newData.Address,
                    neighborhood: newData.Neighborhood,
                    zip: newData.ZIP
                })
            };

            const response = await fetch(`${baseUrl}/account/address`, options);
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

export const updateExistingAddress = (accessToken, oldData, newData) => {
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
                    addressId: oldData.Id,
                    city: newData.City,
                    state: newData.State,
                    country: newData.Country,
                    address: newData.Address,
                    neighborhood: newData.Neighborhood,
                    zip: newData.ZIP
                })
            };

            const response = await fetch(`${baseUrl}/account/address`, options);
            const result = await response.json();
            if (response.status === 200) {
                resolve(result.Message);
            } else {
                reject(result.Message);
            }
        } catch (error) {
            reject(error);
        }

    });
};

export const removeAddress = (accessToken, oldData) => {
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
                    addressId: oldData.Id
                })
            };

            const response = await fetch(`${baseUrl}/account/address`, options);
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


export const updateAccountProduct = (accessToken, productId, product) => {
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
                    productId: productId,
                    image: product.image,
                    name: product.name,
                    categoryId: product.categoryId,
                    description: product.description,
                    price: product.price,
                    wholesalePrice: product.wholesalePrice,
                    wholesaleAmount: product.wholesaleAmount
                })
            };

            const response = await fetch(`${baseUrl}/admin/product`, options);
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

export const addAccountProduct = (accessToken, product) => {
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
                    image: product.image,
                    name: product.name,
                    categoryId: product.categoryId,
                    description: product.description,
                    price: product.price,
                    wholesalePrice: product.wholesalePrice,
                    wholesaleAmount: product.wholesaleAmount
                })
            };

            const response = await fetch(`${baseUrl}/admin/product`, options);
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

export const deleteAccountProduct = (accessToken, productId) => {
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
                    productId: productId
                })
            };

            const response = await fetch(`${baseUrl}/admin/product`, options);
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