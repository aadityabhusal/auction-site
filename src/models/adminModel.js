const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
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
  role: {
    type: Number,
    default: 2,
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

AdminSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

module.exports = mongoose.model("Admin", AdminSchema);
