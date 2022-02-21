export const homePageReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SELECTED_CATEGORY':
      return {
        ...state,
        selectedCategory: action.payload.selectedCategory,
        filteredProducts: action.payload.filteredProducts
      }
    case 'SET_FILTERED_PRODUCTS':
      return {...state, filteredProducts: action.payload};
    case 'REMOVE_PRODUCT' :
      return {...state, filteredProducts: removeProduct(action.payload, state.filteredProducts)};
    default:
      throw new Error(`Invalid "homepageReducer" action type: ${action.type}`);
  }
};

const removeProduct = (id, products) => products.filter(product => product.id !== id);