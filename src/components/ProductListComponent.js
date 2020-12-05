// Created by Alfredo Rodriguez.
// <summary>
// ProductListComponent will render the products and will provide capability to apply filters to have custom results.
// </summary>
import React, { useEffect } from 'react';
import Product from './ProductComponent';
import { connect } from 'react-redux';
import { loadCategories, loadProducts, searchProduct } from '../redux/thunks/ProductThunks';
import { Button, Checkbox, Drawer, FormControl, FormControlLabel, FormGroup, Grid, Hidden, IconButton, MenuItem, Select, Slider, TablePagination, Typography } from '@material-ui/core';
import { Constants } from './Constants';
import { useLocation } from 'react-router-dom';
import { CloseOutlined, Filter, FilterOutlined, Tune } from '@material-ui/icons';

function ProductList({ products = [], productSearch = [], categoryList = [], isLoading, startLoadingProducts, searchProduct, startLoadingCategories }) {
  // #region private properties.
  const location = useLocation();
  const sortOptions = Constants.SortOptions;
  // #endregion private properties.

  // #region public properties.
  const [openFilter, setOpenFilter] = React.useState(false);
  const [isEmpty, setIsEmpty] = React.useState(true);
  const [retrievedProducts, setRetrievedProducts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [pageProducts, setPageProducts] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [maxPrice, setMaxPrice] = React.useState(0);
  const [priceRange, setPriceRange] = React.useState([0, 0]);
  const [priceMarks, setPriceMarks] = React.useState([0, 0]);
  const [selectedSort, setSelectedSort] = React.useState('No ordenar');
  // #endregion public properties.

  // #region public methods.
  const toggleOpenFilter = () => {
    let isOpen = openFilter;
    setOpenFilter(!isOpen);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    let productCount = filteredProducts.length || 0;
    if (productCount > 0 && productCount < ((newPage + 1) * rowsPerPage)) {
      setPageProducts(filteredProducts.slice(newPage * rowsPerPage, (newPage + 1) * productCount));
    } else if (productCount > 0) {
      setPageProducts(filteredProducts.slice(newPage * rowsPerPage, (newPage + 1) * rowsPerPage));
    }
    else {
      setPageProducts([]);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    let newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    let productCount = filteredProducts.length || 0;
    if (productCount > 0 && productCount < (1 * newRowsPerPage)) {
      setPageProducts(filteredProducts.slice(0, 1 * productCount));
    } else if (productCount > 0) {
      setPageProducts(filteredProducts.slice(0, 1 * newRowsPerPage));
    }
  };

  const sortProducts = (event) => {
    let selectedOption = event.target.value;
    setSelectedSort(selectedOption);
    if (selectedOption === 'Orden inicial') {
      return;
    }
    // Starting sort.
    let sortObject = sortOptions.find((option) => option.label === selectedOption);
    const value = sortObject.value;
    const asc = sortObject.asc;
    let productsList = [...filteredProducts];
    productsList.sort((a, b) => {
      if (a[value] < b[value]) {
        return asc ? -1 : 1;
      }
      if (a[value] > b[value]) {
        return asc ? 1 : -1;
      }
      return 0;
    });
    // Updating products list.
    setFilteredProducts(productsList);
  }

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const updateCategoryComponent = (event) => {
    let newCategories = [...categoryList];
    const index = newCategories.findIndex(category => category.Description === event.target.name);
    if (index >= 0) {
      newCategories[index].Checked = event.target.checked;
    }
    setCategories(newCategories);
  };

  const filterProducts = () => {
    let validCategories = [];
    for (let category of categories) {
      if (category.Checked) {
        validCategories.push(category.Id);
      }
    }
    let newProducts = retrievedProducts.filter(product => {
      if (validCategories.length > 0)
        return validCategories.includes(product.CategoryId) && product.Price >= priceRange[0] && product.Price <= priceRange[1]
      else
        return product.Price >= priceRange[0] && product.Price <= priceRange[1];
    });
    setFilteredProducts(newProducts);
  }
  // #endregion public methods.

  // #region private methods.
  const updateInitialProducts = (resultProducts) => {
    setRetrievedProducts(resultProducts);
    setFilteredProducts(resultProducts);
    setIsEmpty(resultProducts.length === 0);

    let productCount = resultProducts.length || 0;
    if (resultProducts.length > 0 && productCount < rowsPerPage) {
      setPageProducts(resultProducts.slice(0, productCount));
    } else if (productCount > 0) {
      setPageProducts(resultProducts.slice(0, rowsPerPage));
    }
    let topPrice = resultProducts.reduce((prev, current) => (prev.Price > current.Price) ? prev : current).Price;
    setPriceMarks([{ value: 0, label: '$0' }, { value: Math.floor(topPrice), label: `$${Math.floor(topPrice)}` }]);
    setPriceRange([0, topPrice]);
    setMaxPrice(topPrice);
  }

  useEffect(() => {
    startLoadingProducts();
    startLoadingCategories();
  }, []);

  useEffect(() => {
    let categoryId = -1;
    let querystring = location.search.toString() || "";
    if (querystring.includes('category')) {
      categoryId = Number(decodeURI(querystring.split("category=")[1]));
    }
    for (let category of categoryList) {
      category.Id === categoryId ?
        category.Checked = true :
        category.Checked = false;
    }
    setCategories(categoryList);
  }, [categoryList]);

  useEffect(() => {
    if (location.search && location.search.includes('search')) {
      let q = decodeURI(location.search.split("search=")[1]);
      searchProduct(q, updateInitialProducts);
    } else {
      if (products.length === 0) {
        startLoadingProducts(updateInitialProducts);
      } else {
        updateInitialProducts(products);
      }
    }
  }, [location]);

  useEffect(() => {
    filterProducts();
  }, [priceRange, categories]);

  useEffect(() => {
    handleChangePage(null, 0);
  }, [filteredProducts]);
  // #endregion private methods.

  // #region render.
  const loadingMessage = <div className="loader-container"><div className="loader"></div></div>

  const content =
    <div className="container paper-container p-4">
      <h1 className="text-center w-100 my-2">PRODUCTOS</h1>

      <Hidden mdUp>
        <Drawer id="filterDrawer" anchor="bottom" open={openFilter} onClose={toggleOpenFilter}>
          <div className="p-4">
            <IconButton onClick={toggleOpenFilter}>
              <CloseOutlined />
            </IconButton>
            <p style={{ fontWeight: 'bold' }}>Ordenar por:</p>
            <FormControl variant="outlined" className="my-2">
              <Select
                native
                id="sort-select"
                value={selectedSort}
                onChange={sortProducts}
              >
                {
                  sortOptions.map((option) => {
                    return <option key={option.label} value={option.label}>{option.label}</option>
                  })
                }
              </Select>
            </FormControl>

            <p style={{ fontWeight: 'bold' }}>Filtrar por:</p>
            <Typography id="price-slider">Precio</Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceRangeChange}
              valueLabelDisplay="auto"
              aria-labelledby="price-slider"
              marks={priceMarks}
              max={maxPrice}
            />

            <Typography>Categoría</Typography>
            <FormGroup>
              {
                categories.map(category => {
                  return (
                    <FormControlLabel
                      key={category.Description}
                      control={<Checkbox checked={category.Checked} onChange={updateCategoryComponent} name={category.Description} />}
                      label={category.Description}
                    />
                  );
                })
              }
            </FormGroup>
          </div>
        </Drawer>
      </Hidden>

      <div className="row" style={{ margin: 'unset' }}>
        <Hidden smDown>
          <Grid item md={2} className="my-2">
            <p style={{ fontWeight: 'bold' }}>Ordenar por:</p>
            <FormControl variant="outlined" className="my-2">
              <Select
                native
                id="sort-select"
                value={selectedSort}
                onChange={sortProducts}
              >
                {
                  sortOptions.map((option) => {
                    return <option key={option.label} value={option.label}>{option.label}</option>
                  })
                }
              </Select>
            </FormControl>

            <p style={{ fontWeight: 'bold' }}>Filtrar por:</p>
            <Typography id="price-slider">Precio</Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceRangeChange}
              valueLabelDisplay="auto"
              aria-labelledby="price-slider"
              marks={priceMarks}
              max={maxPrice}
            />

            <Typography>Categoría</Typography>
            <FormGroup>
              {
                categories.map(category => {
                  return (
                    <FormControlLabel
                      key={category.Description}
                      control={<Checkbox checked={category.Checked} onChange={updateCategoryComponent} name={category.Description} />}
                      label={category.Description}
                    />
                  );
                })
              }
            </FormGroup>
          </Grid>
        </Hidden>

        <Grid item md={10} style={{ width: '100%' }}>
          <Hidden mdUp>
            <div className="flex">
              <Button onClick={toggleOpenFilter} endIcon={<Tune />} style={{ margin: 'auto' }}>
                Filtrar
            </Button>
            </div>
          </Hidden>

          <TablePagination
            className="my-2"
            component="div"
            count={filteredProducts.length}
            page={page}
            onChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            rowsPerPageOptions={[6, 12, 24, 60]}
          />

          <ul className="product-list row">
            {
              pageProducts.map((product) => {
                return (
                  <Product key={product.Id} product={product} />
                );
              })
            }
          </ul>

          <TablePagination
            component="div"
            count={filteredProducts.length}
            page={page}
            onChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            rowsPerPageOptions={[6, 12, 24, 60]}
          />
        </Grid>
      </div>
    </div >;

  const isEmptyContent =
    <div className="container">
      <p className="text-center w-100 my-2">No se encontraron productos</p>
    </div>;

  return isLoading ? loadingMessage : (isEmpty) ? isEmptyContent : content;
  // #endregion render.
}

// #region redux.
const mapStateToProps = state => ({
  products: state.ProductList,
  productSearch: state.ProductSearch,
  categoryList: state.CategoryList,
  isLoading: state.IsLoading
});

const mapDispatchToProps = dispatch => ({
  startLoadingProducts: (callback) => dispatch(loadProducts(callback)),
  searchProduct: (q, callback) => dispatch(searchProduct(q, callback)),
  startLoadingCategories: () => dispatch(loadCategories())
});
// #endregion redux.

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
