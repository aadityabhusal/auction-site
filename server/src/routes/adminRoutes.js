const express = require("express");
const { getAdmin, updateAdmin } = require("../controllers/adminController");

const router = express.Router();

const routes = () => {
  router.get("/", getAdmin);
  router.put("/update", updateAdmin);

  return router;
};

module.exports = routes;
