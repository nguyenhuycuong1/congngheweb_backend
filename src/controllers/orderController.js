const db = require("../models/index");

const createOrder = async (req, res) => {
  const { user_id, address, payment, note } = req.body;
  try {
    const order = await db.Order.create({
      user_id: user_id,
      address: address,
      payment: payment,
      note: note,
    });
    return res.status(200).json({
      message: "successful",
      order_id: order.id,
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};

const createOrderLine = async (req, res) => {
  const data = req.body;

  try {
    await db.Order_Line.bulkCreate(data);
    return res.status(200).json({
      message: "success",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};

const getOrderByUserId = async (req, res) => {
  const user_id = req.params.user_id;
  const orders = await db.Order.findAll({
    where: {
      user_id: user_id,
      status: "pending",
    },
    include: {
      model: db.Order_Line,
      attributes: {
        exclude: ["createdAt", "updatedAt", "product_id", "order_id"],
      },
      include: {
        model: db.Product,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    },
    attributes: {
      exclude: ["user_id"],
    },
    order: [["createdAt", "DESC"]],
  });
  return res.status(200).json({
    message: "successful",
    data: orders,
  });
};

const updateNewAdress = async (req, res) => {
  const order_id = req.params.order_id;
  const newAddress = req.body.newAddress;
  try {
    await db.Order.update(
      { address: newAddress },
      {
        where: {
          id: order_id,
        },
      }
    );
    return res.status(200).json({
      message: "successful",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};

const cancelOrder = async (req, res) => {
  const order_id = req.params.order_id;
  try {
    await db.Order.update({ status: "canceled" }, { where: { id: order_id } });
    return res.status(200).json({
      message: "successful",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};

module.exports = {
  createOrder,
  createOrderLine,
  getOrderByUserId,
  updateNewAdress,
  cancelOrder,
};
