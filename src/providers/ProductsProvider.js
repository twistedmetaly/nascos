import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import useHttp from '../hooks/useHttp';
import {productsUrl} from '../utils/utils';

const ProductContext = React.createContext(null);

export const ProductsProvider = ({children}) => {
  const [products, error, isLoading] = useHttp('GET', productsUrl)

  return <ProductContext.Provider value={[products, error, isLoading]}>
    {children}
  </ProductContext.Provider>
};

ProductsProvider.propTypes = {
  children: PropTypes.any.isRequired
}

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === null) {
    throw new Error('useProductContext must be used withing a "ProductsProvider" tag')
  }
  return context;
};




