import React from "react";
import { Route, Routes } from 'react-router-dom'
import NavBar from "./components/NavBar";
import Home from "./pages/home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProductDetails from "./pages/ProductDetail";
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/confirmation";
import Order from "./pages/Order";
import Banner from "./components/Banner";
import Footer from "./components/Footer";



function App() {
  return (
    <div className="App">
      <Banner />
      <NavBar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<Confirmation />} />
            <Route path="/orders/user/${userId}" element={<Order />} />
          </Routes>
        <Footer />
    </div>
  );
}


export default App;

