const { Op } = require("sequelize");
const db = require("../models/index");

const getUserById = async (req, res) => {
  const user_id = req.params.user_id;
  const user = await db.User.findOne({
    where: {
      id: user_id,
    },
    attributes: {
      exclude: ["password"],
    },
    include: {
      model: db.Cart,
      attributes: {
        exclude: ["user_id", "createdAt", "updatedAt"],
      },
    },
  });
  return res.status(200).json({
    message: "successful",
    user,
  });
};
const getNewUserInMonth = async (req, res) => {
  const date = new Date();
  const month = date.getMonth() + 1;
  try {
    const users = await db.User.findAll({
      where: db.Sequelize.where(
        db.Sequelize.fn("MONTH", db.Sequelize.col("createdAt")),
        month
      ),
      attributes: {
        exclude: ["password", "updatedAt"],
      },
      order: [["createdAt", "DESC"]],
      limit: 10,
    });
    return res.status(200).json({
      message: "successful",
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

const getAllUsers = async (req, res) => {
  const users = await db.User.findAll({
    attributes: {
      exclude: ["password"],
    },
    include: {
      model: db.Cart,
    },
    order: [["createdAt", "DESC"]],
  });
  return res.status(200).json({
    message: "successful",
    data: users,
  });
};

const getUserByIdAdmin = async (req, res) => {
  const user_id = req.params.user_id;
  const user = await db.User.findOne({
    where: {
      id: user_id,
    },
    include: [
      {
        model: db.Cart,
      },
      {
        model: db.Order,
        limit: 10,
      },
    ],
  });
  return res.status(200).json({
    message: "successful",
    data: user,
  });
};

const deleteUser = async (req, res) => {
  const user_id = req.params.user_id;
  await db.User.destroy({
    where: {
      id: user_id,
    },
  });
  await db.Cart.destroy({
    where: {
      user_id: user_id,
    },
  });
  return res.status(200).json({
    message: "successful",
  });
};

module.exports = {
  getUserById,
  getNewUserInMonth,
  getAllUsers,
  getUserByIdAdmin,
  deleteUser,
};
