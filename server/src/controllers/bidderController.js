const Bidder = require("../models/bidderModel");
const sha256 = require("crypto-js/sha256");

const createBidder = async (req, res, next) => {
  try {
    req.body.password = sha256(req.body.password);
    let newBidder = new Bidder(req.body);
    let bidder = await newBidder.save();
    let { password, ...data } = await bidder.toJSON();
    res.status(201).json(data);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const loginBidder = async (req, res, next) => {
  try {
    res.send("Login Bidder");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const logoutBidder = async (req, res, next) => {
  try {
    res.send("Logout Bidder");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};
const authenticateBidder = async (req, res, next) => {
  try {
    res.send("Authenticate Bidder");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};
const getBidder = async (req, res, next) => {
  try {
    res.send("Get Bidder");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const updateBidder = async (req, res, next) => {
  try {
    res.send("Update Bidder");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const deleteBidder = async (req, res, next) => {
  try {
    res.send("Delete Bidder");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

module.exports = {
  createBidder,
  getBidder,
  updateBidder,
  deleteBidder,
  loginBidder,
  logoutBidder,
  authenticateBidder,
};
