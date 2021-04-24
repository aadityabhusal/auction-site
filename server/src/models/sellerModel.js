const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: "Enter your first name",
  },
  lastName: {
    type: String,
    required: "Enter your last name",
  },
  email: {
    type: String,
    required: "Enter your email address",
  },
  password: {
    type: String,
    required: "Enter your password",
  },
  contact: {
    type: String,
    required: "Enter your contact number",
  },
  address: {
    type: String,
    required: "Enter your address",
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Seller", SellerSchema);
