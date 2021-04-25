const express = require("express");
const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  authenticateUser,
} = require("../controllers/userController");

const router = express.Router();

const routes = () => {
  router.post("/signup", createUser);
  router.post("/login", loginUser);
  router.post("/logout", logoutUser);
  router.get("/auth", authenticateUser);

  router.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);

  return router;
};

module.exports = routes;
