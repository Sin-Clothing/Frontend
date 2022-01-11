import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Navbar, Products, Sidebar } from "./components";
import Cart from "./components/Cart/Cart";

import "./index.css";

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const onAddItemToCart = (product) => {
    const exist = cartItems.find((x) => x.productId === product.productId);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.productId === product.productId
            ? { ...exist, qty: exist.qty + 1 }
            : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
    console.log(product);
  };

  const onRemoveItemFromCart = ( product ) => {
    const exist = cartItems.find((x) => x.productId === product.productId);
    if(exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.productId !== product.productId));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.productId === product.productId
            ? { ...exist, qty: exist.qty - 1 }: x
        )
      );
    }
  }

  const defaultCategory = {
    categoryId: -1,
    name: "Alle Artikel",
    description: "Alles ist besser als nix.",
  };
  const [categories, setCategories] = useState([defaultCategory]);

  const fetchProducts = () => {
    fetch("http://localhost:5555/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((e) => setErrorMessage(e));
  };

  const filterProducts = (categoryId) => {
    fetch(`http://localhost:5555/filteredProducts?categoryId=${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((e) => setErrorMessage(e));
  };

  const fetchCategories = () => {
    fetch("http://localhost:5555/category")
      .then((res) => res.json())
      .then((data) => {
        setCategories([defaultCategory, ...data]);
      })
      .catch((e) => setErrorMessage(e));
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <>
      <BrowserRouter>
        <Navbar
          totalItems={cartItems.length}
          handleDrawerToggle={handleDrawerToggle}
        />
        <div className="wrapper">
          <Sidebar filter={filterProducts} categories={categories} />
          <Switch>
            <Route exact path="/">
              <Products
                onAddItemToCart={onAddItemToCart}
                onRemoveItemFromCart={onRemoveItemFromCart}
                products={products}
                error={errorMessage}
              />
            </Route>

            <Route exact path="/cart">
              <Cart
                cartItems={cartItems}
                onAddItemToCart={onAddItemToCart}
                onRemoveItemFromCart={onRemoveItemFromCart}
              ></Cart>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
