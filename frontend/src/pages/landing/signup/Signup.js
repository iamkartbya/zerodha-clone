import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../../services/Api";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    agree: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.agree) {
      alert("Please agree to the terms and conditions");
      return;
    }

    try {
      const res = await registerUser(form.name, form.email, form.password);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.username);
      navigate("/"); // stay on frontend
    } catch (err) {
      if (err.response?.status === 400 && err.response?.data?.error === "User already exists") {
        alert("User already exists! Please login.");
        navigate("/login"); // redirect to login
      } else {
        alert(err.response?.data?.error || "Signup failed");
      }
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <img
          src="https://zerodha.com/static/images/logo.svg"
          alt="Zerodha"
          style={styles.logo}
        />

        <h2 style={styles.heading}>Signup</h2>
        <p style={styles.subtext}>Open a Zerodha account</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile number"
            value={form.mobile}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
            />
            <span style={{ marginLeft: 8 }}>
              I agree to the <a href="#">terms & conditions</a>
            </span>
          </label>

          <button type="submit" style={styles.button}>
            Create account
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9fafb", fontFamily: "Inter, Arial, sans-serif" },
  card: { width: 380, backgroundColor: "#fff", padding: 32, borderRadius: 8, boxShadow: "0 10px 25px rgba(0,0,0,0.08)", textAlign: "center" },
  logo: { height: 28, marginBottom: 20 },
  heading: { margin: 0, fontSize: 22, fontWeight: 600 },
  subtext: { margin: "8px 0 20px", color: "#6b7280", fontSize: 14 },
  input: { width: "100%", padding: "12px 14px", marginBottom: 14, borderRadius: 6, border: "1px solid #d1d5db", fontSize: 14 },
  checkboxLabel: { display: "flex", alignItems: "center", fontSize: 13, color: "#374151", marginBottom: 16 },
  button: { width: "100%", padding: "12px", backgroundColor: "#387ed1", color: "#fff", border: "none", borderRadius: 6, fontSize: 15, fontWeight: 600, cursor: "pointer" },
  footerText: { marginTop: 16, fontSize: 13, color: "#6b7280" },
};
