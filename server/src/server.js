const app = require("./app");
const port = 8000;
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/AuctionSite", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.listen(port, () => console.log(`Listening on port ${port}`));
