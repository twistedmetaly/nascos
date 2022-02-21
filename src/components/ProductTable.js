import React from 'react';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import IconButton from './IconButton/IconButton';
import PropTypes from 'prop-types';

const ProductTable = ({products, onRemove}) => {

  return <div className="row">
    <table className="table table-striped">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Product name</th>
        <th scope="col">Price</th>
        <th scope="col">Actions</th>
      </tr>
      </thead>
      <tbody>
      {
        products.map((product, index) => (
          <tr key={product.id}>
            <td>{index + 1}</td>
            <td>{product.name}</td>
            <td>$ {product.cost}</td>
            <td>
              <IconButton
                icon={<FontAwesomeIcon icon={faEdit}/>}
                onClick={() => console.log('Edit click')}
              />
              {' '}
              <IconButton
                icon={<FontAwesomeIcon icon={faTrash} color={'#d3536c'}/>}
                onClick={() => onRemove(product.id)}
              />
            </td>
          </tr>))
      }
      </tbody>
    </table>
    {
      products.length === 0 && <p>No hay datos</p>
    }
  </div>;
};

ProductTable.propTypes = {
  products: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired
}

export default ProductTable;