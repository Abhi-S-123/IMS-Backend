const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    company_name: String,
    address: String,
    gst_no: String,
    email: String,
    mobile: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Supplier", userSchema);
