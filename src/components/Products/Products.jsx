import React from 'react';

import Product from './Product/Product';

import './Products.css';

const Products = ({ products }) => {

  if (!products.length) return <p>Loading...</p>;

  return (
    <div className="items-container">
      {products.map((product) => (
        <Product product={product} key={product.id}/>
      ))}
    </div>
  );
};

export default Products;

