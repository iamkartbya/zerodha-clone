const mongoose = require("mongoose");
const HoldingsSchema = require("../schemas/HoldingSchema");

const HoldingsModel = mongoose.model("holding", HoldingsSchema);

module.exports = { HoldingsModel };
