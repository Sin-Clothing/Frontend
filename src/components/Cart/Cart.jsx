import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import "./Cart.css";

export default function Cart(props) {
  const { product ,cartItems, onAddItemToCart, onRemoveItemFromCart, currentSize } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemsPrice * 0.14;
  const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;
  const history = useHistory();
  return (
    <body>
      <div className="Cart-container">
        <div className="Header">
          {cartItems != 0 && <h3 className="Heading">Cart&nbsp;Items</h3>}
          </div>
          <div>
            {cartItems.length === 0 && <div className="empty">Cart is empty</div>}
            
            {cartItems.map((item) => (
              <div key={item.id} className="Cart-Items">
                <div className="image-box"><img src={item.pictureUrl} height={140} alt="product" /></div>
                <div className="about">
                  <h2 className="title"> {item.name}</h2> <h3 className="subtitle">{item.size.name}</h3>
                </div>
                <div className="counter">
                  <button onClick={() => onRemoveItemFromCart(item)} className="btn">
                    -
                  </button>
                  <div className="count">{item.qty}</div>
                  <button onClick={() => onAddItemToCart(item)} className="btn">
                    +
                  </button>
                </div>

                <div className="prices">
                  ${item.price.toFixed(2)}
                </div>
              </div>
            ))}

            {cartItems.length !== 0 && (
              <>
                <hr></hr>
                <div>
                  <div className="ueber">Items Price</div>
                  <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
                </div>
                <div>
                  <div className="ueber">Tax Price</div>
                  <div className="col-1 text-right">${taxPrice.toFixed(2)}</div>
                </div>
                <div>
                  <div className="ueber">Shipping Price</div>
                  <div className="col-1 text-right">
                    ${shippingPrice.toFixed(2)}
                  </div>
                </div>

                <div className="row">
                  <div className="total-amount">
                    <strong>Total Price</strong>
                  </div>
                  <div className="col-1 text-right">
                    <strong>${totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <button className="button" onClick={handleClick}>
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        </body>  
  );
  
  function handleClick() {
    console.log(totalPrice)
    history.push({state:{cartItems, totalPrice}, pathname:"/checkout"});
  }

  function Zoom({ src }) {
    const backgroundImage = `url(${src})`;
    const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');
  }
}