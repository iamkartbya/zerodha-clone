import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../dashboard/services/Api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.username); // store username
      navigate("/"); // stay on frontend
    } catch (err) {
      alert(err.response?.data?.error || "Invalid email or password");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <img src="https://zerodha.com/static/images/logo.svg" alt="Zerodha" style={styles.logo} />
        <h2 style={styles.heading}>Login</h2>
        <p style={styles.subtext}>Welcome back</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        <p style={styles.footerText}>
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

const styles = {
  page: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9fafb", fontFamily: "Inter, Arial, sans-serif" },
  card: { width: 360, backgroundColor: "#fff", padding: 32, borderRadius: 8, boxShadow: "0 10px 25px rgba(0,0,0,0.08)", textAlign: "center" },
  logo: { height: 28, marginBottom: 20 },
  heading: { margin: 0, fontSize: 22, fontWeight: 600 },
  subtext: { margin: "8px 0 20px", color: "#6b7280", fontSize: 14 },
  input: { width: "100%", padding: "12px 14px", marginBottom: 14, borderRadius: 6, border: "1px solid #d1d5db", fontSize: 14 },
  button: { width: "100%", padding: "12px", backgroundColor: "#387ed1", color: "#fff", border: "none", borderRadius: 6, fontSize: 15, fontWeight: 600, cursor: "pointer" },
  footerText: { marginTop: 16, fontSize: 13, color: "#6b7280" },
};
