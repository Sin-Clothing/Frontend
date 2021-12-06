import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import React from 'react';

import './Product.css';

const Product = ({ product, onClick }) => {
  return (
    <div className="item" onClick={() => onClick()}>
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

export function Popup({ children, trigger, close }) {
  return (trigger) ? (
    <div className="item-popup">
      <div className="item-popup-inner">
        <button type="button" className="close-btn" onClick={() => close()}> <FontAwesomeIcon icon={faTimes} /> </button>
        { children }
      </div>
    </div>
  ) : '';
}

export default Product;
