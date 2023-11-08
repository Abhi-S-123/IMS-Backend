const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  address: String,
  city: String,
  country: String,
  mobile : String
}, {
  timestamps: true
})

module.exports = mongoose.model("Customer", userSchema);