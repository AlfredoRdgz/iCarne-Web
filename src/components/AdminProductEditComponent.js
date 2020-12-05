// Created by Alfredo Rodriguez.
// <summary>
// ProductEditComponent will provide capabilities to let admins edit one of their products.
// </summary>
import React, { useEffect } from 'react';
import { Card, TextField, Button, Select, InputLabel, FormControl, InputAdornment, Breadcrumbs, IconButton } from '@material-ui/core';
import { connect } from 'react-redux';
import { AttachMoney, PhotoCamera, Save } from '@material-ui/icons';
import { addAccountProduct, updateAccountProduct } from '../redux/viewmodels/Account';
import { uploadProductImage } from '../redux/viewmodels/Product';
import { loadCategories, loadProducts } from '../redux/thunks/ProductThunks';
import { Link, useHistory } from 'react-router-dom';
import { Constants } from './Constants';
const UrlEndpoints = Constants.UrlEndpoints;
const ValidationMessages = Constants.ValidationMessages;

function AdminProductEdit({ user, product, categories, startLoadingCategories, reloadProducts }) {
    // #region private properties.
    const history = useHistory();
    const { Id, Name, Image, CategoryId, Description, Price, WholesalePrice, WholesaleAmount } = product || {};
    // #endregion private properties.

    // #region public properties.
    const [imageUploaded, setImageUploaded] = React.useState(false);
    const [productId, setProductId] = React.useState(Id);
    const [productImage, setProductImage] = React.useState(Image || "");
    const [productName, setProductName] = React.useState(Name || "");
    const [productCategory, setProductCategory] = React.useState(CategoryId || 1);
    const [productDescription, setProductDescription] = React.useState(Description || "");
    const [productPrice, setProductPrice] = React.useState(Price || 0.01);
    const [productWholesalePrice, setProductWholesalePrice] = React.useState(WholesalePrice || 0.01);
    const [productWholesaleAmount, setProductWholesaleAmount] = React.useState(WholesaleAmount || 0);
    // #endregion public properties.

    // #region public methods.
    const handleSelectedCategory = (event) => {
        setProductCategory(event.target.value);
    }

    const triggerFileInput = () => {
        document.getElementById('productImage').click();
        return false;
    }

    const loadImagePreview = (event) => {
        let selectedFile = event.target.files[0];
        let reader = new FileReader();
        // Define callback function for reader.
        reader.onload = function () {
            if (reader.readyState === 2) {
                setProductImage(reader.result);
                setImageUploaded(true);
            }
        };
        // Call image reader.
        reader.readAsDataURL(selectedFile);
    }

    const handleSaveProduct = async (event) => {
        event.preventDefault();
        let saveBtn = document.getElementById('saveBtn');
        saveBtn.disabled = true;
        try {
            let imageUrl = productImage;
            if (imageUploaded) {
                let selectedFile = document.getElementById('productImage').files[0];
                imageUrl = await uploadProductImage(user?.AccessToken, selectedFile);
            }
            // Image validation.
            if (!imageUrl) {
                throw "Debe subir una imagen para guardar";
            }
            // Product object generation.
            let newProductData = {
                image: imageUrl,
                name: productName,
                categoryId: Number(productCategory),
                description: productDescription,
                price: Number(productPrice),
                wholesalePrice: Number(productWholesalePrice),
                wholesaleAmount: Number(productWholesaleAmount)
            };

            if (productId) {
                await updateAccountProduct(user?.AccessToken, productId, newProductData);
            } else {
                let newProduct = await addAccountProduct(user?.AccessToken, newProductData);
                setProductId(newProduct.InsertId);
            }
            alert('Producto guardado con éxito.');
            history.push(UrlEndpoints.accountProducts);
            reloadProducts();
        } catch (error) {
            alert(error);
        }
        saveBtn.disabled = false;
    }
    // #endregion public methods.

    // #region private methods.
    useEffect(() => {
        if (categories.length === 0) {
            startLoadingCategories();
        }
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

    useEffect(() => {
        if (!productCategory) {
            setProductCategory(categories[0].Id);
        }
    }, [categories]);
    // #endregion private methods.

    // #region render.
    return (
        <div className="container p-4">

            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" to={UrlEndpoints.account}>Mi cuenta </Link>
                <Link color="inherit" to={UrlEndpoints.accountProducts}>Mis productos</Link>
                <Link to="#" color="secondary">Editar producto</Link>
            </Breadcrumbs>

            <h1 className="text-center my-4"> Editar producto </h1>
            <Card className="p-4" style={{ borderRadius: '20px' }}>
                <form className="row" onSubmit={handleSaveProduct}>
                    <div className="col-12 my-4 flex">
                        <img className="product-edit-image" src={productImage} alt="Cargar imagen del producto" />
                        <Button style={{ width: '200px', margin: 'auto' }} variant="contained" color="secondary" onClick={triggerFileInput} startIcon={<PhotoCamera />}>
                            Cargar Imagen
                        </Button>
                        <input className="hidden" id="productImage" name="image" type="file" style={{ margin: 'auto' }} onChange={loadImagePreview} accept="image/*" />
                    </div>
                    <div className="col-12 col-md-6 my-4">
                        <TextField fullWidth required id="productName" variant="outlined" label="Nombre del producto" value={productName}
                            onChange={(event) => { setProductName(event.target.value); }} />
                    </div>
                    <div className="col-12 col-md-6 my-4">
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="categoryLabel">Categoría del producto</InputLabel>
                            <Select required labelId="categoryLabel" id="category" value={productCategory} onChange={handleSelectedCategory} native autoWidth={true}>
                                {
                                    categories.map((category) => {
                                        return <option key={category.Id} value={category.Id}>{category.Description}</option>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div className="col-12 my-4">
                        <TextField fullWidth required id="productDescription" variant="outlined" label="Descripción del producto" multiline rowsMax={4} value={productDescription}
                            onChange={(event) => { setProductDescription(event.target.value); }} />
                    </div>
                    <div className="col-12 col-md-4 my-4">
                        <TextField fullWidth required id="productPrice" variant="outlined" label="Precio a menudeo" type="number" value={productPrice}
                            onChange={(event) => { setProductPrice(event.target.value); }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AttachMoney />
                                    </InputAdornment>
                                ),
                            }}
                            inputProps={{
                                step: '0.01',
                                min: '0.01',
                                required: 'required'
                            }} />
                    </div>
                    <div className="col-12 col-md-4  my-4">
                        <TextField fullWidth required id="wholesalePrice" variant="outlined" label="Precio a mayoreo" type="number" value={productWholesalePrice}
                            onChange={(event) => { setProductWholesalePrice(event.target.value); }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AttachMoney />
                                    </InputAdornment>
                                ),
                            }}
                            inputProps={{
                                step: '0.01',
                                min: '0.01',
                                required: 'required'
                            }} />
                    </div>
                    <div className="col-12 col-md-4  my-4">
                        <TextField fullWidth required id="wholesaleAmount" variant="outlined" label="Artículos para mayoreo" type="number" value={productWholesaleAmount}
                            onChange={(event) => { setProductWholesaleAmount(event.target.value); }}
                            inputProps={{
                                min: '0',
                                required: 'required'
                            }} />
                    </div>
                    <div className="col-12 my-4 flex">
                        <Button id="saveBtn" style={{ margin: '10px auto' }} type="submit" color="secondary" variant="contained" startIcon={<Save />}>
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
    product: state.AccountProduct,
    categories: state.CategoryList
});

const mapDispatchToProps = dispatch => ({
    startLoadingCategories: () => dispatch(loadCategories()),
    reloadProducts: () => dispatch(loadProducts())
});
// #endregion redux.


export default connect(mapStateToProps, mapDispatchToProps)(AdminProductEdit);