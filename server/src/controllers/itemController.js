const Item = require("../models/itemModel");
const User = require("../models/userModel");

const createItem = async (req, res, next) => {
  try {
    req.body.image = req.file.filename;
    req.body.seller = JSON.parse(req.body.seller);
    let newItem = new Item(req.body);
    let item = await newItem.save();
    await User.findOneAndUpdate(
      { _id: req.body.seller._id },
      { $push: { items: { itemId: item._id, itemTitle: item.title } } },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    res.send({ message: "Item Uploaded" });
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const getItem = async (req, res, next) => {
  try {
    res.send("Get Item");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const updateItem = async (req, res, next) => {
  try {
    res.send("Update Item");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    res.send("Delete Item");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

module.exports = { createItem, getItem, updateItem, deleteItem };
