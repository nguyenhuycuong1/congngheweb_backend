var db = require("../models/index");

const getAllProducts = async (req, res) => {
  const products = await db.Product.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  return res.status(200).json({
    message: "success",
    data: products,
  });
};

const getProductById = async (req, res) => {
  const prodId = req.params.prodId;
  const product = await db.Product.findOne({
    where: {
      id: prodId,
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  return res.status(200).json({
    message: "success",
    data: product,
  });
};

const getProductsByBrand = async (req, res) => {
  const brand_id = req.params.brandId;
  const products = await db.Brand.findOne({
    where: {
      id: brand_id,
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: {
      model: db.Product,
      attributes: {
        exclude: ["brand_id", "createdAt", "updatedAt"],
      },
    },
  });
  return res.status(200).json({
    message: "success",
    data: products,
  });
};

const getProductsByPrice = async (req, res) => {
  const oderBy = req.params.orderBy;
  const o = oderBy === "asc" ? "ASC" : "DESC";
  const products = await db.Product.findAll({
    order: [["price", o]],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  return res.status(200).json({
    message: "success",
    data: products,
  });
};

const getProductsSearchResult = async (req, res) => {
  const { product_name } = req.query;
  const products = await db.Product.findAll({
    where: {
      product_name: { [db.Sequelize.Op.like]: `%${product_name}%` },
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  return res.status(200).json({
    message: "success",
    data: products,
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByBrand,
  getProductsByPrice,
  getProductsSearchResult,
};
