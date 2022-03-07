import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Checkout, Navbar, Products, Sidebar, Cart } from "./components";

import "./index.css";

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const onAddItemToCart = (product) => {
    const exist = cartItems.find((x) => x.productId === product.productId && x.size.sizeId == product.size.sizeId);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          (x.productId === product.productId && x.size.sizeId == product.size.sizeId)
            ? { ...exist, qty: exist.qty + 1 }
            : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const onRemoveItemFromCart = (product) => {
    const exist = cartItems.find((x) => x.productId === product.productId && x.size.sizeId == product.size.sizeId);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.productId !== product.productId));
    } else {
      setCartItems(
        cartItems.map((x) =>
          (x.productId === product.productId && x.size.sizeId == product.size.sizeId)
            ? { ...exist, qty: exist.qty - 1 }
            : x
        )
      );
    }
  };

  const defaultCategory = {
    categoryId: -1,
    name: "Alle Artikel",
    description: "Alles ist besser als nix.",
  };
  const [categories, setCategories] = useState([defaultCategory]);

  const [sizes, setSizes] = useState([]);

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

  const fetchSizes = () => {
    fetch("http://localhost:5555/sizes")
      .then((res) => res.json())
      .then((data) => {
        setSizes(data);
      })
      .catch((e) => setErrorMessage(e));
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSizes();
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
          <Switch>
            <Route exact path="/">
              <Sidebar filter={filterProducts} categories={categories} />
              <Products
                onAddItemToCart={onAddItemToCart}
                onRemoveItemFromCart={onRemoveItemFromCart}
                products={products}
                sizes={sizes}
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
            <Route exact path="/checkout">
              <Checkout>
                
              </Checkout>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
