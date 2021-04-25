const mongoose = require("mongoose");

const AuctionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Enter the product title",
  },
  category: {
    type: String,
    required: "Enter the product category",
  },
  bidAmount: {
    type: Number,
    required: "Enter the bid amount",
  },
  image: {
    type: Buffer,
    required: "Enter the product image",
  },
  conatct: {
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
  expiryDate: {
    type: Date,
    required: "Enter the product expiry",
  },
});

module.exports = mongoose.model("Auction", AuctionSchema);
