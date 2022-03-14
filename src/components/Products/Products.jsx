import React, { useEffect, useRef, useState } from 'react';
//import { Link, useLocation } from 'react-router-dom';
import Product, { Popup } from './Product/Product';
import ProductInfo from './ProductInfo/ProductInfo';

import './Products.css';



const Products = ({ products, error, onAddItemToCart, onRemoveItemFromCart, sizes}) => {
  //const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState(undefined);

  if (error.length) return <p>{error}</p>;
  if (!products.length) return <p>Loading...</p>;
  //deleteAllItemsFromCart();

  return (
    <div className="items-container">
      {products.map((product) => (
        <Product sizes={sizes} onAddItemToCart={onAddItemToCart} product={product} key={`product-${product.productId}`} onClick={() => setSelectedProduct(product)} />
      ))}
      <Popup trigger={selectedProduct !== undefined} close={() => setSelectedProduct(undefined)}>
        <ProductInfo onRemoveItemFromCart={onRemoveItemFromCart} onAddItemToCart={onAddItemToCart} product={selectedProduct} sizes={sizes} />
      </Popup>
    </div>
  );
};

export default Products;

