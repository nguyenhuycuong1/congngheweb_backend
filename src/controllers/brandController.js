var db = require("../models/index");

const getAllBrands = async (req, res) => {
  const brands = await db.Brand.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  return res.status(200).json({
    message: "success",
    data: brands,
  });
};

module.exports = {
  getAllBrands,
};
