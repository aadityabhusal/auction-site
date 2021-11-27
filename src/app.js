const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
const routes = require("./routes");

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/", routes());

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.resolve(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.use((err, req, res, next) => {
  res.status(err.status).json({ error: err });
});

module.exports = app;
