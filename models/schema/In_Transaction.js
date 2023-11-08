const mongoose = require("mongoose");

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
const userSchema = new mongoose.Schema({
  supplier_id: { type: ObjectId, required: true },
  product_id: { type: ObjectId, required: true },
  qty: { type: Number, required: true },
  date: { type: Date, default: new Date() },
});

module.exports = mongoose.model("In_transaction", userSchema);
