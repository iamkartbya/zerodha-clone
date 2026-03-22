const mongoose = require("mongoose");

const WatchlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    default: 0,
  },
  avg: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
  day: {
    type: String,
    default: "", // optional, for UI
  },
  net: {
    type: String,
    default: "", // optional, for UI
  },
}, { timestamps: true });

const WatchlistModel = mongoose.model(
  "Watchlist",
  WatchlistSchema,
  "watchlists"
);

module.exports = { WatchlistModel };
