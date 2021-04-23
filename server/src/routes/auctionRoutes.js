const express = require("express");
const {
  getAuction,
  updateAuction,
  deleteAuction,
  createAuction,
} = require("../controllers/auctionController");

const router = express.Router();

const routes = () => {
  router.post("/", createAuction);
  router
    .route("/:auctionId")
    .get(getAuction)
    .put(updateAuction)
    .delete(deleteAuction);

  return router;
};

module.exports = routes;
