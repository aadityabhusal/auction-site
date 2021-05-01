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
    let item = await Item.findById(req.params.itemId);
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
      /* Delete the older image file */
    }
    if (req.body.seller) {
      req.body.seller = JSON.parse(req.body.seller);
    }

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

    await User.findOneAndUpdate(
      { _id: req.body._id },
      {
        $push: {
          bidsPlaced: { _id: item._id, title: item.title, image: item.image },
        },
      },
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
  try {
    let regex = new RegExp(req.params.value, "i");
    let items = await Item.find({ title: regex });
    res.send(items);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const getHomePageItems = async (req, res, next) => {
  try {
    let item = await Item.find({}).sort({ auctionDate: -1 }).limit(20);
    res.send(item);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

module.exports = {
  createItem,
  getItem,
  updateItem,
  deleteItem,
  placeBid,
  searchItem,
  getHomePageItems,
};
