import React from "react";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import "./assets/css/tailwind.css";
import ShopGrid from "./pages/shop/shop-grid/shop-grid";
import ShopList from "./pages/shop/shop-list/shop-list";
import Shopcart from "./pages/shop/shop-cart";
import ShopCheckOut from "./pages/shop/shop-checkout";
import AboutUS from "./pages/pages/aboutus";
import UserAccount from "./pages/pages/my-account/user-account";
import UserPayment from "./pages/pages/my-account/user-payment";
import UserSetting from "./pages/pages/my-account/user-setting";
import Login from "./pages/pages/auth/login";
import Signup from "./pages/pages/auth/signup";
import ForgotPassword from "./pages/pages/auth/forgot-password";
import Contact from "./pages/contact";
import ProductDetailOne from "./pages/shop/shop-detail/product-detail-one";
import SignSuccess from "./pages/pages/auth/signup-success";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />}></Route>
      <Route path="/shop-grid" element={<ShopGrid />}></Route>
      <Route path="/shop-list" element={<ShopList />}></Route>
      <Route path="/shop-cart" element={<Shopcart />}></Route>
      <Route path="/shop-checkout" element={<ShopCheckOut />}></Route>
      <Route path="/aboutus" element={<AboutUS />}></Route>
      <Route path="/user-account" element={<UserAccount />}></Route>
      <Route path="/user-payment" element={<UserPayment />}></Route>
      <Route path="/user-setting" element={<UserSetting />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      <Route path="/contact" element={<Contact />}></Route>
      <Route path="/product-detail-one" element={<ProductDetailOne />}></Route>
      <Route
        path="/product-detail-one/:id"
        element={<ProductDetailOne />}
      ></Route>
      <Route path="/signup-success" element={<SignSuccess />}></Route>
    </Routes>
  );
}

export default App;
