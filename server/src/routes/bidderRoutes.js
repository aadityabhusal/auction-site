const express = require("express");
const {
  getBidder,
  createBidder,
  updateBidder,
  deleteBidder,
  loginBidder,
  logoutBidder,
  authenticateBidder,
} = require("../controllers/bidderController");

const router = express.Router();

const routes = () => {
  router.post("/signup", createBidder);
  router.post("/login", loginBidder);
  router.post("/logout", logoutBidder);
  router.get("/auth", authenticateBidder);

  router
    .route("/:bidderId")
    .get(getBidder)
    .put(updateBidder)
    .delete(deleteBidder);

  return router;
};

module.exports = routes;
