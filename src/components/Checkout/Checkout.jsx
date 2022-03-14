import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";

export default function Checkout() {
    const location = useLocation();
    const history = useHistory();
    return (
        <div>
            <h1>Contact Info</h1>
            <div className="contact-info">
                <input type="text" placeholder="Email" id="email"></input>
                <br></br>
                <input type="text" placeholder="Firstname" id="firstname" value="fname"></input>
                <input type="text" placeholder="Lastname" id="lastname" value="lname"></input>
            </div>
            <h1>Shipping details</h1>
            <div className="shipping-details">
                <input type="text" placeholder="Country" id="country" value="country"></input>
                <br></br>
                <input type="text" placeholder="Streetname" id="streetname" value="sname"></input>
                <input type="text" placeholder="Streetnumber" id="streetnumber" value="snumber"></input>
                <input type="text" placeholder="Doornumber" id="doornumber" value="dnumber"></input>
                <br></br>
                <input type="text" placeholder="City" id="city" value="city"></input>
                <input type="text" placeholder="Postal Code" id="postalcode" value="postal"></input>
            </div>
            <div className="button-div">
                  <button className="button" onClick={handleClick}>
                    Submit
                  </button>
                </div>
        </div>
    )

    function handleClick() {
        const date = new Date();
        const order = {
            date: date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay()+", "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds(),
            firstname: document.getElementById("firstname").value,
            lastname: document.getElementById("lastname").value,
            email: document.getElementById("email").value,
            address: document.getElementById("country").value 
            + ";" + document.getElementById("city").value
            + ";" + document.getElementById("streetname").value
            + ";" + document.getElementById("streetnumber").value
            + ";" + document.getElementById("doornumber").value
            + ";" + document.getElementById("postalcode").value,
            orderItems: location.state.cartItems,
            amount: location.state.totalPrice
        };
        console.log(order.amount);
        fetchOrder(order);
        const items = location.state.cartItems;
        const checkoutState = true;
        history.push({state:{items, checkoutState}, pathname:"/"});
    }

    function fetchOrder(order) {
        fetch("http://localhost:5555/checkout", {
            method: "POST",
            body: JSON.stringify(order),
            headers: {'Content-Type': 'application/json'}
        });
    }
}



