const express = require("express");

const userRoutes = require("./userRoutes");
const itemRoutes = require("./itemRoutes");

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
  router.use("/item", itemRoutes());

  return router;
};

module.exports = routes;
