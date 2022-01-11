import React, { useEffect, useRef, useState } from 'react';

import Product, { Popup } from './Product/Product';
import ProductInfo from './ProductInfo/ProductInfo';

import './Products.css';

const Products = ({ products, error, onAddItemToCart, onRemoveItemFromCart}) => {

  const [selectedProduct, setSelectedProduct] = useState(undefined);

  if (error.length) return <p>{error}</p>;
  if (!products.length) return <p>Loading...</p>;

  return (
    <div className="items-container">
      {products.map((product) => (
        <Product onAddItemToCart={onAddItemToCart} product={product} key={product.id} onClick={() => setSelectedProduct(product)} />
      ))}
      <Popup trigger={selectedProduct !== undefined} close={() => setSelectedProduct(undefined)}>
        <ProductInfo onRemoveItemFromCart={onRemoveItemFromCart} onAddItemToCart={onAddItemToCart} product={selectedProduct} />
      </Popup>
    </div>
  );
};

export default Products;

