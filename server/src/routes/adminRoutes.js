const express = require("express");
const {
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
  authenticateAdmin,
  getUsers,
  getItems,
} = require("../controllers/adminController");

const router = express.Router();

const routes = () => {
  router.post("/signup", createAdmin);
  router.post("/login", loginAdmin);
  router.post("/auth", authenticateAdmin);
  router.get("/users", getUsers);
  router.get("/items", getItems);

  router.route("/:adminId").get(getAdmin).put(updateAdmin).delete(deleteAdmin);

  return router;
};

module.exports = routes;
