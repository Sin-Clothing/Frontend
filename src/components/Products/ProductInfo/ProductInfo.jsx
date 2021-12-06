import React, { useState } from 'react';

import './ProductInfo.css';

const ProductInfo = ({ product }) => {
  return (
    <div className="product-info">
      <div className="image">
        <Zoom src={product.pictureUrl} />
      </div>
      <div className="details">
        <p>{product.name}</p>
        <p>{product.price}$</p>
      </div>
    </div>
  );
};

function Zoom({ src }) {
  const backgroundImage = `url(${src})`;
  const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  return (
    <figure onMouseMove={(e) => handleMouseMove(e)} style={{ backgroundImage, backgroundPosition }}>
      <img src={src} />
    </figure>
  );
}

export default ProductInfo;
