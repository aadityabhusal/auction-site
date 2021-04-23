const express = require("express");
const {
  getSeller,
  createSeller,
  updateSeller,
  deleteSeller,
} = require("../controllers/sellerController");

const router = express.Router();

const routes = () => {
  router.post("/", createSeller);
  router
    .route("/:sellerId")
    .get(getSeller)
    .put(updateSeller)
    .delete(deleteSeller);

  return router;
};

module.exports = routes;
