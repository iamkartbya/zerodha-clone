import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Landing pages
import HomePage from "./pages/landing/home/HomePage";
import Signup from "./pages/landing/signup/Signup";
import Login from "./pages/landing/signup/Login";
import AboutPage from "./pages/landing/about/AboutPage";
import ProductPage from "./pages/landing/products/ProductPage";
import PricingPage from "./pages/landing/pricing/PricingPage";
import SupportPage from "./pages/landing/support/SupportPage";
import NotFound from "./pages/landing/NotFound";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);
