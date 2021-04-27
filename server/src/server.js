const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
const port = 8000;
const routes = require("./routes");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/AuctionSite", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/", routes());

app.use((err, req, res, next) => {
  res.status(err.status).json({ error: err.message });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
