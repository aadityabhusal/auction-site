const Seller = require("../models/sellerModel");
const sha256 = require("crypto-js/sha256");

const createSeller = async (req, res, next) => {
  try {
    req.body.password = sha256(req.body.password);
    let newSeller = new Seller(req.body);
    let seller = await newSeller.save();
    let { password, ...data } = await seller.toJSON();
    res.status(201).json(data);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const loginSeller = async (req, res, next) => {
  try {
    res.send("Login Seller");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const logoutSeller = async (req, res, next) => {
  try {
    res.send("Logout Seller");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};
const authenticateSeller = async (req, res, next) => {
  try {
    res.send("Authenticate Seller");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};
const getSeller = async (req, res, next) => {
  try {
    res.send("Get Seller");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const updateSeller = async (req, res, next) => {
  try {
    res.send("Update Seller");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const deleteSeller = async (req, res, next) => {
  try {
    res.send("Delete Seller");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

module.exports = {
  createSeller,
  getSeller,
  updateSeller,
  deleteSeller,
  loginSeller,
  logoutSeller,
  authenticateSeller,
};
