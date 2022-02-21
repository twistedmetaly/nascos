import React, {useContext} from 'react';
import useHttp from '../hooks/useHttp';
import PropTypes from 'prop-types';
import {categoriesUrl} from '../utils/utils';

const CategoriesContext = React.createContext(null);

export const CategoriesProvider = ({children}) => {
  const [categories, error, isLoading] = useHttp('GET',categoriesUrl);

  return <CategoriesContext.Provider value={[categories, error, isLoading]}>
    {children}
  </CategoriesContext.Provider>
};

CategoriesProvider.propTypes = {
  children: PropTypes.any.isRequired
}

export const useCategoriesContext = () => {
  const context = useContext(CategoriesContext);
  if (context === null) {
    throw new Error('useCategoriesContext must be used within "CategoriesContext" tag')
  }
  return context;
};