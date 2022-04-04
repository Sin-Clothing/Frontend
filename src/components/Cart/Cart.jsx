import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./Cart.css";

export default function Cart(props) {
  const { product ,cartItems, onAddItemToCart, onRemoveItemFromCart, currentSize } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const history = useHistory();
  const taxPrice = itemsPrice/5;
  const netto = itemsPrice * 0.8;
  const totalPrice = netto + taxPrice;
  return (
    <div id="cart-body">
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
                  <div className="ueber">Netto</div>
                  <div className="col-1 text-right">${netto.toFixed(2)}</div>
                </div>
                <div>
                  <div className="ueber">Tax Price</div>
                  <div className="col-1 text-right">${taxPrice.toFixed(2)}</div>
                </div>

                <div className="row">
                  <div className="total-amount">
                    <strong>Total Price</strong>
                  </div>
                  <div className="totalPrice text-right">
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
      </div>  
  );
  
  function handleClick() {
    history.push({state:{cartItems, totalPrice}, pathname:"/checkout"});
  }
}