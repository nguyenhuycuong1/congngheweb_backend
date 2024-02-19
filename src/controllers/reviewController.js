const db = require("../models/index");

const createReview = async (req, res) => {
  const data = req.body;
  try {
    await db.Review.create(data);
    return res.status(200).json({
      message: "successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createReview,
};
