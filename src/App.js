import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Navbar, Products, Sidebar } from "./components";

import "./index.css";

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = () => {
    fetch("http://localhost:5555/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((e) => setErrorMessage(e));
  };

  const filterProducts = (category) => {
    fetch(`http://localhost:5555/filteredProducts?categoryName=${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((e) => setErrorMessage(e));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <>
      <BrowserRouter>
        <Navbar totalItems={0} handleDrawerToggle={handleDrawerToggle} />
        <div className="wrapper">
          <Sidebar filter={filterProducts} getAll={fetchProducts} />
          <Switch>
            <Route exact path="/">
              <Products products={products} />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
