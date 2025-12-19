require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Models
const { UserModel } = require("./model/UserModel");
const { OrdersModel } = require("./model/OrdersModel");
const { HoldingsModel } = require("./model/HoldingModels");
const { PositionsModel } = require("./model/PositionsModel");

// Middleware
const app = express();
const PORT = process.env.PORT || 3002;
const MONGO_URI = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"], // frontend and dashboard
  credentials: true,
}));
app.use(express.json());

// -------------------- PROTECT MIDDLEWARE --------------------
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return res.status(401).json({ error: "Not authorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await UserModel.findById(decoded.id).select("-password");
    if (!req.user) throw new Error("User not found");
    next();
  } catch (err) {
    res.status(401).json({ error: "Token invalid" });
  }
};

// -------------------- ROUTES --------------------

// Health check
app.get("/", (req, res) => res.send("Backend server is running!"));

// REGISTER
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ username, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ token, user: { id: user._id, username, email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user._id, username: user.username, email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- ORDERS --------------------

// Get all orders for logged-in user
app.get("/orders", protect, async (req, res) => {
  try {
    const orders = await OrdersModel.find({ user: req.user._id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new order for logged-in user
app.post("/newOrder", protect, async (req, res) => {
  const { name, qty, price, mode } = req.body;

  if (!name || !qty || !price || !mode) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // 1️⃣ Save order
    const order = new OrdersModel({
      name,
      qty,
      price,
      mode,
      user: req.user._id,
    });
    await order.save();

    // 2️⃣ BUY LOGIC
    if (mode === "BUY") {
      let holding = await HoldingsModel.findOne({
        user: req.user._id,
        name,
      });

      if (!holding) {
        // Create new holding
        holding = new HoldingsModel({
          user: req.user._id,
          name,
          qty,
          avg: price,
          price,
        });
      } else {
        // Update existing holding
        const totalQty = holding.qty + qty;
        const newAvg =
          (holding.qty * holding.avg + qty * price) / totalQty;

        holding.qty = totalQty;
        holding.avg = Number(newAvg.toFixed(2));
        holding.price = price;
      }

      await holding.save();
    }

    // 3️⃣ SELL LOGIC (already added)
    if (mode === "SELL") {
      const holding = await HoldingsModel.findOne({
        user: req.user._id,
        name,
      });

      if (!holding) {
        return res.status(400).json({ error: "Holding not found" });
      }

      if (qty > holding.qty) {
        return res.status(400).json({ error: "Insufficient quantity" });
      }

      holding.qty -= qty;

      if (holding.qty === 0) {
        await holding.deleteOne();
      } else {
        await holding.save();
      }
    }

    res.status(201).json({
      message: `${mode} order placed successfully`,
      order,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- HOLDINGS --------------------
app.get("/allHoldings", protect, async (req, res) => {
  try {
    const holdings = await HoldingsModel.find({ user: req.user._id });
    res.json(holdings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- POSITIONS --------------------
app.get("/allPositions", protect, async (req, res) => {
  try {
    const positions = await PositionsModel.find({ user: req.user._id });
    res.json(positions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- START SERVER --------------------
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch(err => console.error("DB connection error:", err.message));
