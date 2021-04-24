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
  image: {
    type: Buffer,
    required: "Enter the product image",
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
