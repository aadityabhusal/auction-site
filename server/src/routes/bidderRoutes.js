const express = require("express");
const {
  getBidder,
  createBidder,
  updateBidder,
  deleteBidder,
} = require("../controllers/bidderController");

const router = express.Router();

const routes = () => {
  router.post("/", createBidder);
  router
    .route("/:bidderId")
    .get(getBidder)
    .put(updateBidder)
    .delete(deleteBidder);

  return router;
};

module.exports = routes;
