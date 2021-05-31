const express = require("express");
const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  authenticateUser,
  getWonItems,
} = require("../controllers/userController");

const router = express.Router();

const routes = () => {
  router.post("/signup", createUser);
  router.post("/login", loginUser);
  router.post("/auth", authenticateUser);
  router.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);
  router.get("/:userId/wonitems", getWonItems);

  return router;
};

module.exports = routes;
