const Item = require("../models/itemModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const fs = require("fs");

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
            _id: item._id,
            title: item.title,
            image: item.image,
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
    let item = await Item.findOne({ _id: req.params.itemId, status: 1 });
    res.send(item);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const updateItem = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = req.file.filename;
      let item = await Item.findOne({ _id: req.params.itemId }, { image: 1 });
      fs.unlink(__dirname + "/../../uploads/" + item.image, (err) => {});
    }
    if (req.body.seller) {
      req.body.seller = JSON.parse(req.body.seller);
    }

    let updated = await (
      await Item.findOneAndUpdate({ _id: req.params.itemId }, req.body, {
        new: true,
        useFindAndModify: false,
      })
    ).toJSON();

    await User.updateOne(
      { "items._id": updated._id },
      {
        $set: {
          "items.$.title": updated.title,
          "items.$.image": updated.image,
          "items.$.status": updated.status,
        },
      }
    );

    res.send({ message: "Item Updated" });
  } catch (error) {
    console.log(error);
    error.status = 400;
    return next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    let item = await Item.findOne({ _id: req.params.itemId }, { image: 1 });
    fs.unlink(__dirname + "/../../uploads/" + item.image, (err) => {});
    await Item.deleteOne({ _id: req.params.itemId });
    await User.findOneAndUpdate(
      { _id: req.body.sellerId },
      {
        $pull: {
          items: {
            _id: mongoose.Types.ObjectId(req.params.itemId),
          },
        },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );

    res.send({ message: "Item Deleted" });
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const placeBid = async (req, res, next) => {
  try {
    let item = await Item.findOneAndUpdate(
      { _id: req.params.itemId },
      { bidAmount: req.body.bidAmount, $push: { bidders: req.body } },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    res.send(item);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const searchItem = async (req, res, next) => {
  let regex = new RegExp(req.params.value, "i");
  let items = await Item.find({ title: regex, status: 1 });
  res.send(items);
};

const advancedSearch = async (req, res, next) => {
  req.body.title = new RegExp(req.body.search, "i");
  delete req.body.search;
  if (req.body.price) {
    req.body.bidAmount = {
      $gt: Number(req.body.price[0]),
      $lt: Number(req.body.price[1]),
    };
    delete req.body.price;
  }
  if (req.body.auctionDate) {
    let date = new Date(req.body.auctionDate);
    let date2 = new Date(req.body.auctionDate);
    date2.setDate(date2.getDate() + 1);
    req.body.auctionDate = {
      $gte: date,
      $lt: date2,
    };
  }
  let items = await Item.find({ ...req.body, status: 1 });
  res.send(items);
};

const getHomePageItems = async (req, res, next) => {
  let item = await Item.find({ status: 1 }).sort({ auctionDate: -1 }).limit(20);
  res.send(item);
};

module.exports = {
  createItem,
  getItem,
  updateItem,
  deleteItem,
  placeBid,
  searchItem,
  advancedSearch,
  getHomePageItems,
};
