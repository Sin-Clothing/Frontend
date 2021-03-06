import { PhotoSizeSelectActual } from '@material-ui/icons';
import React, { useState } from 'react';

import './ProductInfo.scss';

export default function ProductInfo(props) {
  
  const [currentSize, setCurrentSize] = useState(-1);
  const { product, onAddItemToCart, sizes} = props;
  if (!sizes.length) return <p>Loading...</p>;
  
  return (
    <div className="product-info">
      <div className="image">
        <Zoom src={product.pictureUrl} />
      </div>

      <div className="details">
        <p>{product.name}</p>
        <p className='cypress-price'>{product.price} €</p>
        <p>Größe: {sizes.find((s) => s.sizeId == currentSize)?.name || sizes[0].name}</p>
        
        <select name="size" id="size" onChange={(event) => { setCurrentSize(event.target.value); }}>
          {sizes.map((size) => (
            <option key={`size-${size.sizeId}`} value={size.sizeId}>{size.name}</option>
          ))}
        </select>
      </div>
      <br />
      <div className="addToCart">
        <button className="add-to-cart-button" onClick={() => onAddItemToCart({...product, size: (sizes.find((s) => s.sizeId == currentSize) || sizes[0])})}>  
          <svg className="add-to-cart-box box-1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="2" fill="#ffffff"/></svg>  
          <svg className="add-to-cart-box box-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="2" fill="#ffffff"/></svg>  
          <svg className="cart-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" stroke-line-join="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>  
          <svg className="tick" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path fill="#ffffff" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29L5.7 12.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z"/></svg>  
          <span className="add-to-cart">Add to cart</span>  
          <span className="added-to-cart">Added to cart</span>  
        </button>  
      </div>
    </div>
  );
}


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
