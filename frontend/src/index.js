import Dashboard from "./pages/dashboard/Dashboard"; // import Dashboard

root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      {/* Landing Pages */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/support" element={<SupportPage />} />

      {/* Kite Dashboard */}
      <Route path="/kite/*" element={<Dashboard />} />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);
