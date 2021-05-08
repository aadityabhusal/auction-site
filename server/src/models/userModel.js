const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
  items: {
    type: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: "Enter item id",
        },
        title: {
          type: String,
          required: "Enter item title",
        },
        image: {
          type: String,
          required: "Enter item image",
        },
      },
    ],
    default: [],
  },
  status: {
    type: Number,
    default: 0,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
