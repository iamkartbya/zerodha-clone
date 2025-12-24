import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Dashboard
import Dashboard from "./pages/dashboard/Dashboard";

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
    <Routes>
      {/* Landing pages */}
      <Route path="/" element={<><Navbar /><HomePage /><Footer /></>} />
      <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
      <Route path="/signup" element={<><Navbar /><Signup /><Footer /></>} />
      <Route path="/about" element={<><Navbar /><AboutPage /><Footer /></>} />
      <Route path="/product" element={<><Navbar /><ProductPage /><Footer /></>} />
      <Route path="/pricing" element={<><Navbar /><PricingPage /><Footer /></>} />
      <Route path="/support" element={<><Navbar /><SupportPage /><Footer /></>} />

      {/* Kite Dashboard (separate) */}
      <Route path="/kite/*" element={<Dashboard />} />

      {/* Fallback */}
      <Route path="*" element={<><Navbar /><NotFound /><Footer /></>} />
    </Routes>
  </BrowserRouter>
);
