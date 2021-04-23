const createSeller = async (req, res, next) => {
  try {
    res.send("Create Seller");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const getSeller = async (req, res, next) => {
  try {
    res.send("Get Seller");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const updateSeller = async (req, res, next) => {
  try {
    res.send("Update Seller");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const deleteSeller = async (req, res, next) => {
  try {
    res.send("Delete Seller");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

module.exports = { createSeller, getSeller, updateSeller, deleteSeller };
