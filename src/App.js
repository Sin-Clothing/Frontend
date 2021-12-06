import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Navbar, Products, Sidebar } from './components';

import './index.css';

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const defaultCategory = { categoryId: -1, name: 'Alle Artikel', description: 'Alles ist besser als nix.' };
  const [categories, setCategories] = useState([defaultCategory]);

  const fetchProducts = () => {
    fetch('http://localhost:5555/products')
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
    fetch('http://localhost:5555/category')
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
        <Navbar totalItems={0} handleDrawerToggle={handleDrawerToggle} />
        <div className="wrapper">
          <Sidebar filter={filterProducts} categories={categories} />
          <Switch>
            <Route exact path="/">
              <Products products={products} error={errorMessage} />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
