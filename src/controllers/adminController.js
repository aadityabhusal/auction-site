require("dotenv").config({ path: __dirname + "/../.env" });
const Admin = require("../models/adminModel");
const User = require("../models/userModel");
const Item = require("../models/itemModel");
const mongoose = require("mongoose");

const sha256 = require("crypto-js/sha256");
const Hex = require("crypto-js/enc-hex");
const jwt = require("jsonwebtoken");

const createAdmin = async (req, res, next) => {
  try {
    req.body.password = req.body.password && sha256(req.body.password);
    if (await Admin.exists({ email: req.body.email })) {
      throw new Error("Email already exists");
    }
    let newAdmin = new Admin(req.body);
    let admin = await newAdmin.save();
    let { password, ...data } = await admin.toJSON();
    res.send({ message: "Admin Created" });
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const loginAdmin = async (req, res, next) => {
  let email = req.body.email;
  let passwordHash = sha256(req.body.password);
  let admin = await Admin.findOne({ email });

  if (!Boolean(admin)) {
    res.send({ error: "Admin not found" });
  } else if (admin.password !== Hex.stringify(passwordHash)) {
    res.send({ error: "Incorrect Password" });
  } else {
    const token = jwt.sign(
      { _id: admin._id, role: admin.role },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.send({ uid: admin._id, adminToken: token });
  }
};

const authenticateAdmin = async (req, res, next) => {
  try {
    const adminToken = req.body.adminToken;
    if (!adminToken) throw new Error("Unauthenticated Admin");

    const verify = jwt.verify(adminToken, process.env.ACCESS_TOKEN_SECRET);
    if (!verify) throw new Error("Verification Failed");

    let { password, ...data } = await (
      await Admin.findById(verify._id)
    ).toJSON();
    res.send(data);
  } catch (error) {
    error.status = 200;
    return next(error);
  }
};

const updateAdmin = async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = Hex.stringify(sha256(req.body.password));
    }
    let { password, ...data } = await (
      await Admin.findOneAndUpdate({ _id: req.params.adminId }, req.body, {
        new: true,
        useFindAndModify: false,
      })
    ).toJSON();
    res.send(data);
  } catch (error) {
    error.status = 400;
    return next(error);
  }
};

const deleteAdmin = async (req, res, next) => {
  try {
    await Admin.deleteOne({ _id: req.params.adminId });
    res.send({ message: "Admin Deleted" });
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const getUsers = async (req, res, next) => {
  let data = await User.find(
    {},
    {
      firstName: 1,
      lastName: 1,
      email: 1,
      contact: 1,
      address: 1,
      status: 1,
    }
  );
  res.send(data);
};

const getItems = async (req, res, next) => {
  let data = await Item.find({});
  res.send(data);
};

const getAdmins = async (req, res, next) => {
  let data = await Admin.find({ role: { $ne: "1" } });
  res.send(data);
};

const approveWinner = async (req, res, next) => {
  try {
    await Item.findOneAndUpdate(
      { _id: req.body.item._id },
      { winner: req.body.winner },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    res.send({ message: "Winner Approved" });
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

module.exports = {
  createAdmin,
  getUsers,
  getItems,
  getAdmins,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
  authenticateAdmin,
  approveWinner,
};
