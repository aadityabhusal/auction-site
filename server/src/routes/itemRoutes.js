const express = require("express");
const multer = require("multer");

const {
  getItem,
  updateItem,
  deleteItem,
  createItem,
} = require("../controllers/itemController");

const router = express.Router();

var imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      req.body.title.toLowerCase().replace(/ /g, "_") +
        "_" +
        Date.now() +
        "." +
        file.originalname.split(".").slice(-1).pop()
    );
  },
});

const upload = multer({ storage: imageStorage });

const routes = () => {
  router.post("/", upload.single("image"), createItem);
  router
    .route("/:itemId")
    .get(getItem)
    .put(upload.single("image"), updateItem)
    .delete(deleteItem);

  return router;
};

module.exports = routes;
