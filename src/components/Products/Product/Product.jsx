import React from 'react';

import './Product.css'

const Product = ({ product }) => {
  return (
    <div className="item">
      <div>
        <img src={product.pictureUrl} />
      </div>
      <div className="description">
        <p>{product.name}</p>
        <p className="price">{product.price}$</p>
      </div>
    </div>
  );
};

export default Product;