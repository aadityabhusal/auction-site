const express = require("express");

const adminRoutes = require("./adminRoutes");
const aunctionRoutes = require("./auctionRoutes");
const bidderRoutes = require("./bidderRoutes");
const sellerRoutes = require("./sellerRoutes");

const router = express.Router();

const routes = () => {
  router.get("/", (req, res, next) => {
    try {
      res.send("Get Home");
    } catch (error) {
      return next(error);
    }
  });

  router.use("/admin", adminRoutes());
  router.use("/auction", aunctionRoutes());
  router.use("/bidder", bidderRoutes());
  router.use("/seller", sellerRoutes());

  return router;
};

module.exports = routes;
