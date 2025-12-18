const {Schema}=require("mongoose");
const OrdersSchema = new Schema({
  name: String,
  qty: Number,
  price: Number,       
  mode: {
    type: String,
    enum: ["BUY", "SELL"],  
    required: true,
  },
});

module.exports={OrdersSchema};