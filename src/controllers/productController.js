var db = require("../models/index");

const getAllProducts = async (req, res) => {
  const products = await db.Product.findAll({
    include: {
      model: db.Review,
      attributes: {
        exclude: ["createdAt", "updatedAt", "comment", "user_id", "product_id"],
      },
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    order: [["id", "ASC"]],
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
    include: {
      model: db.Review,
      include: {
        model: db.User,
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      },
      order: [["createdAt", "DESC"]],
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

const updateProductInfo = async (req, res) => {
  const product_id = req.params.product_id;
  const { product_name, description, price } = req.body;
  await db.Product.update(
    {
      product_name: product_name,
      description: description,
      price: price,
    },
    {
      where: {
        id: product_id,
      },
    }
  );
  return res.status(200).json({
    message: "successful",
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByBrand,
  getProductsByPrice,
  getProductsSearchResult,
  updateProductInfo,
};
