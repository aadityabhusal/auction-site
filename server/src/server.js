const app = require("./app");
const mongoose = require("mongoose");
const port = 8000;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/AuctionSite", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(port, () => console.log(`Listening on port ${port}`));
