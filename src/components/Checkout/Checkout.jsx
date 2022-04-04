import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import './Checkout.css';

export default function Checkout(props) {
    const { onClearCart } = props;
    const location = useLocation();
    const history = useHistory();
    return (
        
        <div class="container">
            <h3>Contact Info</h3>
            <div className="contact-info">
                <label for="email"><i class="fa fa-envelope"></i> Email</label>
                <input type="text" placeholder="Email" id="email"></input>
                <br></br>
                <label for="fname"><i class="fa fa-user"></i> Firstname</label>
                <input type="text" placeholder="Firstname" id="firstname"></input>
                <label for="fname"><i class="fa fa-user"></i> Lastname</label>
                <input type="text" placeholder="Lastname" id="lastname"></input>
            </div>
            <h3>Shipping details</h3>
            <div className="shipping-details">
                <label for="city"><i class="fa fa-institution"></i> Country</label>
                <input type="text" placeholder="Country" id="country"></input>
                <br></br>
                <label for="adr"><i class="fa fa-address-card-o"></i> Street</label>
                <input type="text" placeholder="Streetname" id="streetname"></input>
                <label for="adr"><i class="fa fa-address-card-o"></i> Streetnumber</label>
                <input type="text" placeholder="Streetnumber" id="streetnumber"></input>
                <label for="adr"><i class="fa fa-address-card-o"></i> Doornumber</label>
                <input type="text" placeholder="Doornumber" id="doornumber"></input>
                <br></br>
                <label for="city"><i class="fa fa-institution"></i> City</label>
                <input type="text" placeholder="City" id="city"></input>
                <label for="city"><i class="fa fa-institution"></i> Postal Code</label>
                <input type="text" placeholder="Postal Code" id="postalcode"></input>
            </div>
            <div className="button-div">
                <button className="btn" onClick={handleClick}>
                    Submit
                </button>
            </div>
        </div>
    )

    function handleClick() {
        const date = new Date();
        console.log(date);
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
        fetchOrder(order);
        const items = location.state.cartItems;
        const checkoutState = true;
        onClearCart();
        history.push({state:{items, checkoutState}, pathname:"/"});
    }

    function fetchOrder(order) {
        fetch("http://ec2-3-88-230-75.compute-1.amazonaws.com:5555/checkout", {
            method: "POST",
            body: JSON.stringify(order),
            headers: {'Content-Type': 'application/json'}
        });
    }
}



