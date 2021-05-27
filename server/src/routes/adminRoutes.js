const express = require("express");
const {
  createAdmin,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
  authenticateAdmin,
  getUsers,
  getItems,
  getAdmins,
  approveWinner,
} = require("../controllers/adminController");

const router = express.Router();

const routes = () => {
  router.post("/signup", createAdmin);
  router.post("/login", loginAdmin);
  router.post("/auth", authenticateAdmin);
  router.get("/users", getUsers);
  router.get("/items", getItems);
  router.get("/admins", getAdmins);
  router.put("/approveWinner", approveWinner);

  router.route("/:adminId").put(updateAdmin).delete(deleteAdmin);

  return router;
};

module.exports = routes;
