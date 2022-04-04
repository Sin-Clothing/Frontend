import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useRef } from 'react';

import './Product.css';

const Product = ({ product, onClick }) => {
  return (
    <div className="item" onClick={() => onClick()}>
      <div>
        <img src={product.pictureUrl} alt="product" />
      </div>
      <div className="description">
        <p>{product.name}</p>
        <p className="price">{product.price.toFixed(2)} €</p>
      </div>
    </div>
  );
};

export function Popup({ children, trigger, close, ref }) {

  const popUpRef = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!popUpRef.current?.contains(event.target)) {
        close();
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  return (trigger) ? (
    <div className="item-popup">
      <div ref={popUpRef} className="item-popup-inner">
        <button type="button" className="close-btn" onClick={() => close()}> <FontAwesomeIcon icon={faTimes} /> </button>
        { children }
      </div>
    </div>
  ) : '';
}

export default Product;
