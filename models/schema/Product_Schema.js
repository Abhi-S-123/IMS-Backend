const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    product_name: { type: String, required: true },
    price: { type: Number, required: true },
    uom: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: false, default: 0 },
    margin: { type: Number, required: false, default: 5 }, // in percentage
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", userSchema);
