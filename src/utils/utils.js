export const mapCategoriesToSelectOptions = (categories) => categories.map(category => ({
  value: String(category.id),
  text: category.name
}))

export const findById = id => obj => obj.id === id

export const productsUrl = 'http://localhost:3001/products';

export const categoriesUrl = 'http://localhost:3001/categories';

export const waitForPromise = time => new Promise(r => setTimeout(r, time));

