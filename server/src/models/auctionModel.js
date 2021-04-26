const mongoose = require("mongoose");

const AuctionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Enter the item title",
  },
  category: {
    type: String,
    required: "Enter the item category",
  },
  bidAmount: {
    type: Number,
    required: "Enter the bid amount",
  },
  description: {
    type: Number,
    required: "Enter the item description",
  },
  image: {
    type: Buffer,
    required: "Enter the item image",
  },
  conatct: {
    type: String,
    required: "Enter your contact number",
  },
  address: {
    type: String,
    required: "Enter your address",
  },
  status: {
    type: Number,
    default: 0,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  auctionDate: {
    type: Date,
    required: "Enter the auction date",
  },
});

module.exports = mongoose.model("Auction", AuctionSchema);
