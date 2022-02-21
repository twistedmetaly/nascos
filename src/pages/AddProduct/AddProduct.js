import React, {useState} from 'react';
import localStyles from './AddProduct.module.css'
import Select from '../../components/Select';

const departmentOptions = [{value: '1', text: 'Clothes'}, {value: '2', text: 'Electronics'}];
const categoryOptions = [{value: '1', text: 'Clothes'}, {value: '2', text: 'Electronics'}];

const AddProduct = () => {
  const [product, setProduct] = useState('');
  const [price, setPrice] = useState('');
  const [department, setDepartment] = useState({value: 'default'});
  const [category, setCategory] = useState({value: 'default'});

  const handleProductChange = ({target: {value}}) => {
    value && setProduct(value);
  };

  const handlePriceChange = ({target: {value}}) => {
    value && setPrice(value);
  };

  const handleDepartmentChange = (value) => {
    value && setDepartment(value);
  };

  const handleCategoryChange = (value) => {
    value && setCategory(value);
  };

  return <main>
    <div className="row mb-3">
      <h3>Add product</h3>
    </div>
    <section className="row">
      <div className="col col-lg-6">
        <img src="https://picsum.photos/200" alt="product picture" className={localStyles.img}/>
      </div>
      <div className="col col-lg-6">
        <form className={localStyles.form}>
          <div className="mb-3">
            <label htmlFor="product-name" className="form-label">Product Name</label>
            <div className="input-group input-group-lg">
              <input
                type="text"
                value={product}
                id="product-name"
                className="form-control"
                onChange={handleProductChange}/>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="product-price" className="form-label">Product Price</label>
            <div className="input-group input-group-lg">
              <span className="input-group-text">$</span>
              <input
                type="text"
                value={price}
                id="product-price"
                className="form-control"
                onChange={handlePriceChange}/>
              <span className="input-group-text">.00</span>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Department</label>
            <Select
              className="form-select form-select-lg mb-3"
              selected={department.value}
              options={departmentOptions}
              onChange={handleDepartmentChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <Select
              className="form-select form-select-lg mb-3"
              selected={category.value}
              options={categoryOptions}
              onChange={handleCategoryChange}
            />
          </div>
          <div className="mb3 clearfix">
            <button className="btn btn-primary float-end" type="button">Add Product</button>
          </div>
        </form>
      </div>
    </section>
  </main>
};

export default AddProduct;