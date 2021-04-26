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
      {
        $push: {
          items: {
            itemId: item._id,
            itemTitle: item.title,
            itemImage: item.image,
          },
        },
      },
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
    let site = await Item.findById(req.params.itemId);
    res.send(site);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const updateItem = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = req.file.filename;
      /* Delete the older image file */
    }
    req.body.seller = JSON.parse(req.body.seller);
    await Item.findOneAndUpdate({ _id: req.params.itemId }, req.body, {
      new: true,
      useFindAndModify: false,
    });
    res.send({ message: "Item Updated" });
  } catch (error) {
    error.status = 400;
    return next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    await Item.deleteOne({ _id: req.params.itemId });
    res.send({ message: "Item Deleted" });
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

module.exports = { createItem, getItem, updateItem, deleteItem };
