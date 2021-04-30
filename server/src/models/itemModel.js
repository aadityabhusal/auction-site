const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Enter the item title",
  },
  category: {
    type: Number,
    required: "Enter the item category",
  },
  bidAmount: {
    type: Number,
    required: "Enter the bid amount",
  },
  description: {
    type: String,
    required: "Enter the item description",
  },
  seller: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: "Enter seller id",
    },
    firstName: {
      type: String,
      required: "Enter seller first name",
    },
    lastName: {
      type: String,
      required: "Enter seller last name",
    },
  },
  bidders: {
    type: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: "Enter seller id",
        },
        firstName: {
          type: String,
          required: "Enter seller first name",
        },
        lastName: {
          type: String,
          required: "Enter seller last name",
        },
        bidAmount: {
          type: Number,
          required: "Enter bid amout",
        },
      },
    ],
    default: [],
  },
  image: {
    type: String,
    required: "Enter the item image",
  },
  contact: {
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

module.exports = mongoose.model("Item", ItemSchema);
