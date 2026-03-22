import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://zerodha-backend-1njm.onrender.com";

const api = axios.create({
  baseURL: API_URL,
});

// Attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---------------- AUTH ----------------
export const registerUser = (username, email, password) =>
  api.post("/register", { username, email, password });

export const loginUser = (email, password) =>
  api.post("/login", { email, password });

// ---------------- DASHBOARD ----------------
export const fetchWatchlist = () => api.get("/watchlist"); //  this fetches from populated Watchlist
export const addToWatchlist = (stock) => api.post("/watchlist", stock);
export const removeFromWatchlist = (id) => api.delete(`/watchlist/${id}`);
export const fetchOrders = () => api.get("/orders");
export const fetchHoldings = () => api.get("/allHoldings");
export const fetchPositions = () => api.get("/allPositions");

// ---------------- ORDERS ----------------
export const placeOrder = (orderData) =>
  api.post("/newOrder", orderData);

export default api;
