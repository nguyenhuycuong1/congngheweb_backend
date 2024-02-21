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

const deleteReview = async (req, res) => {
  const review_id = req.params.review_id;
  try {
    await db.Review.destroy({
      where: {
        id: review_id,
      },
    });
    return res.status(200).json({
      message: "successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createReview,
  deleteReview,
};
