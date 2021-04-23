const getAdmin = async (req, res, next) => {
  try {
    res.send("Get Admin");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const updateAdmin = async (req, res, next) => {
  try {
    res.send("Update Admin");
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

module.exports = { getAdmin, updateAdmin };
