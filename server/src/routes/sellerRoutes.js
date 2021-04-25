const express = require("express");
const {
  getSeller,
  createSeller,
  updateSeller,
  deleteSeller,
  loginSeller,
  logoutSeller,
  authenticateSeller,
} = require("../controllers/sellerController");

const router = express.Router();

const routes = () => {
  router.post("/signup", createSeller);
  router.post("/login", loginSeller);
  router.post("/logout", logoutSeller);
  router.get("/auth", authenticateSeller);

  router
    .route("/:sellerId")
    .get(getSeller)
    .put(updateSeller)
    .delete(deleteSeller);

  return router;
};

module.exports = routes;
