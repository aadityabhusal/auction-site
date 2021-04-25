const User = require("../models/userModel");
const sha256 = require("crypto-js/sha256");
const Hex = require("crypto-js/enc-hex");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: __dirname + "/../.env" });

const createUser = async (req, res, next) => {
  try {
    req.body.password = sha256(req.body.password);
    let newUser = new User(req.body);
    let user = await newUser.save();
    let { password, ...data } = await user.toJSON();
    console.log(data);
    res.status(201).json(data);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    let email = req.body.email;
    let passwordHash = sha256(req.body.password);
    let user = await User.findOne({ email });

    if (!Boolean(user)) {
      throw new Error("User not found");
    }
    if (user.password !== Hex.stringify(passwordHash)) {
      throw new Error("Incorrect Password");
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.send({ uid: user._id, role: user.role });
  } catch (error) {
    error.status = 400;
    return next(error);
  }
};

const logoutUser = (req, res, next) => {
  res.cookie("jwt", "", {
    maxAge: 0,
  });
  res.send({ message: "Logout Success" });
};

const authenticateUser = async (req, res, next) => {
  try {
    const cookie = req.cookies["jwt"];
    if (!cookie) throw new Error("Unauthenticated User");

    const verify = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET);
    if (!verify) throw new Error("Unauthenticated User");

    let { password, ...data } = await (
      await User.findById(verify._id)
    ).toJSON();
    res.send(data);
  } catch (error) {
    error.status = 200;
    return next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    res.send("Get User");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    res.send("Update User");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    res.send("Delete User");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  authenticateUser,
};
