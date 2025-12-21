import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Register / Login
export const registerUser = (username, email, password) => api.post("/register", { username, email, password });
export const loginUser = (email, password) => api.post("/login", { email, password });

// Dashboard APIs
export const fetchOrders = () => api.get("/orders");
export const fetchHoldings = () => api.get("/holdings");
export const fetchPositions = () => api.get("/positions");
