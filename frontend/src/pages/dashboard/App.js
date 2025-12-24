// App.js
import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Login from "../landing/signup/Login";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/kite/*" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
