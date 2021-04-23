const createBidder = async (req, res, next) => {
  try {
    res.send("Create Bidder");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const getBidder = async (req, res, next) => {
  try {
    res.send("Get Bidder");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const updateBidder = async (req, res, next) => {
  try {
    res.send("Update Bidder");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const deleteBidder = async (req, res, next) => {
  try {
    res.send("Delete Bidder");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

module.exports = { createBidder, getBidder, updateBidder, deleteBidder };
