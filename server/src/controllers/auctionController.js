const createAuction = async (req, res, next) => {
  try {
    res.send("Create Auction");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const getAuction = async (req, res, next) => {
  try {
    res.send("Get Auction");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const updateAuction = async (req, res, next) => {
  try {
    res.send("Update Auction");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const deleteAuction = async (req, res, next) => {
  try {
    res.send("Delete Auction");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

module.exports = { createAuction, getAuction, updateAuction, deleteAuction };
