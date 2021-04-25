const User = require("../models/userModel");
const sha256 = require("crypto-js/sha256");

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
    res.send("Login User");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    res.send("Logout User");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};
const authenticateUser = async (req, res, next) => {
  try {
    res.send("Authenticate User");
  } catch (error) {
    error.status = 500;
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
