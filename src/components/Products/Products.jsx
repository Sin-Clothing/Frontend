import React, { useEffect, useRef, useState } from 'react';

import Product, { Popup } from './Product/Product';
import ProductInfo from './ProductInfo/ProductInfo';

import './Products.css';

const Products = ({ products, error }) => {

  const [selectedProduct, setSelectedProduct] = useState(undefined);

  if (error.length) return <p>{error}</p>;
  if (!products.length) return <p>Loading...</p>;

  return (
    <div className="items-container">
      {products.map((product) => (
        <Product product={product} key={product.id} onClick={() => setSelectedProduct(product)} />
      ))}
      <Popup trigger={selectedProduct !== undefined} close={() => setSelectedProduct(undefined)}>
        <ProductInfo product={selectedProduct} />
      </Popup>
    </div>
  );
};

export default Products;

