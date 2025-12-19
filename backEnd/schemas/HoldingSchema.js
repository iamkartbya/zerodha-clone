const mongoose=require("mongoose");
const {Schema}=mongoose;
const HoldingsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: String,
  qty: Number,
  avg: Number,
  price: Number,
});

module.exports = {
  HoldingsModel: mongoose.model("Holding", HoldingsSchema),
};