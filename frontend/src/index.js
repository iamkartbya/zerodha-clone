// src/index.js (combined App.js + index.js)
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/landing/home/HomePage";
import Signup from "./pages/landing/signup/Signup";
import Login from "./pages/landing/signup/Login";
import AboutPage from "./pages/landing/about/AboutPage";
import ProductPage from "./pages/landing/products/ProductPage";
import PricingPage from "./pages/landing/pricing/PricingPage";
import SupportPage from "./pages/landing/support/SupportPage";
import NotFound from "./pages/landing/NotFound";

import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

//import "./index.css";

// ---------------- Layout Wrapper ----------------
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/kite");

  return (
    <div className="app-container">
      {!isDashboard && <Navbar />}
      <div className="main-content">{children}</div>
      {!isDashboard && <Footer />}
    </div>
  );
};

// ---------------- Main App ----------------
const App = () => {
  return (
    <Routes>
      {/* Landing Pages */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/support" element={<SupportPage />} />

      {/* Protected Dashboard */}
      <Route
        path="/kite/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

// ---------------- Render ----------------
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <LayoutWrapper>
        <App />
      </LayoutWrapper>
    </HashRouter>
  </React.StrictMode>
);
