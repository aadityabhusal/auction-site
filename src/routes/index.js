const express = require("express");

const adminRoutes = require("./adminRoutes");
const userRoutes = require("./userRoutes");
const itemRoutes = require("./itemRoutes");

const router = express.Router();

const routes = () => {
  router.use("/admin", adminRoutes());
  router.use("/user", userRoutes());
  router.use("/item", itemRoutes());
  return router;
};

module.exports = routes;
