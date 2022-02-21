import React, {useEffect, useReducer, useState} from 'react';
import ProductTable from '../components/ProductTable';
import Select from '../components/Select';
import {Link} from 'react-router-dom';
import {categoriesUrl, findById, mapCategoriesToSelectOptions, productsUrl} from '../utils/utils';
import {homePageReducer} from '../reducers/HomePageReducer';
import useHttp from '../hooks/useHttp';
import axios from 'axios';
import {useToastContext} from '../providers/ToastsProvider';
import PropTypes from 'prop-types';

const Homepage = ({department}) => {

  const [toasts, setToasts] = useToastContext();
  const [products, setProducts] = useState([]);
  const [errorProducts, setErrorProducts] = useState('');
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [state, dispatch] = useReducer(homePageReducer, {
    selectedCategory: {value: 'default', text: 'All categories'},
    filteredProducts: []
  });

  const [categories, errorCategories, isLoadingCategories] = useHttp(
    'GET',
    categoriesUrl + (department === 'all' ? '' : `?department=${department}`)
  );

  useEffect(async () => {
    if (!categories)
      return;
    setIsLoadingProducts(true);
    try {
      const res = await axios({
        method: 'GET',
        url: productsUrl + (department === 'all' ? '' : `?category=${categories.map(category => category.name).join('&category=')}`)
      });
      setIsLoadingProducts(false);
      setProducts(res.data);
    } catch (err) {
      setErrorProducts(err);
    }

  }, [categories]);


  useEffect(() => {
    dispatch({type: 'SET_FILTERED_PRODUCTS', payload: products});
  }, [products]);


  const handleCategoryChange = (option) => {
    let filtered = products;

    if (option.value !== 'default') {
      filtered = products.filter(product => {
        return product.category === option.text
      });
    }
    dispatch({
      type: 'SET_SELECTED_CATEGORY',
      payload: {
        selectedCategory: option,
        filteredProducts: filtered
      }
    });
  }

  const handleOnRemoveProduct = (productId) => {
    axios({method: 'DELETE', url: `${productsUrl}/${productId}`})
      .then(resp => {
        if (resp.status >= 200 && resp.status < 300) {
          const obj = state.filteredProducts.find(findById(productId));
          setToasts([...toasts, {
            alertType: 'success',
            message: `El producto "${obj.name}" se ha eliminado correctamente`
          }])
          dispatch({type: 'REMOVE_PRODUCT', payload: productId});
        }
      })
      .catch(err => {
        setToasts([...toasts, {
          alertType: 'danger',
          message: `Ha ocurrido un error eliminando el producto: '${err}'`
        }])
      })
  }

  return <main>
    <div className="row mb-3 mt-3">
      <h3>Products</h3>
    </div>
    <div className="row">
      <div className="col col-12 col-sm-6 col-lg-3">
        {
          isLoadingCategories ? (
            <select className="form-select form-select-lg mb-3">
              <option value="default">All categories</option>
            </select>) : (
            errorCategories ? (<p>Error cargando las categorias</p>) : (
              <Select
                className="form-select form-select-lg mb-3"
                selected={state.selectedCategory.value}
                defaultSelection="All categories"
                options={mapCategoriesToSelectOptions(categories)}
                onChange={handleCategoryChange}
              />))}
      </div>
      <div className="col col-12 col-sm-6 col-lg-2 offset-lg-7">
        <Link to="/add-product" className="btn btn-primary float-end">Add Product</Link>
      </div>
    </div>
    {
      isLoadingProducts ? <p>Cargando</p> : (
        errorProducts ? <p>Error cargando los datos</p> : (
          <ProductTable
            products={state.filteredProducts}
            onRemove={handleOnRemoveProduct}/>
        )
      )
    }


  </main>
};

Homepage.propTypes = {
  department: PropTypes.string
}

export default Homepage;

