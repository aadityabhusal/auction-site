const express = require("express");

const userRoutes = require("./userRoutes");
const aunctionRoutes = require("./auctionRoutes");

const router = express.Router();

const routes = () => {
  router.get("/", (req, res, next) => {
    try {
      res.send("Get Home");
    } catch (error) {
      return next(error);
    }
  });

  router.use("/user", userRoutes());
  router.use("/auction", aunctionRoutes());

  return router;
};

module.exports = routes;
