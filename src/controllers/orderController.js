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

const deliveryOrder = async (req, res) => {
  const order_id = req.params.order_id;
  try {
    await db.Order.update({ status: "delivered" }, { where: { id: order_id } });
    return res.status(200).json({
      message: "successful",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};

const getOrderByStatus = async (req, res) => {
  const status = req.params.status;
  const orders = await db.Order.findAll({
    where: {
      status: status,
    },
    include: [
      {
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
      {
        model: db.User,
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      },
    ],

    order: [["createdAt", "DESC"]],
  });
  return res.status(200).json({
    message: "successful",
    data: orders,
  });
};

const revenueForMonth = async (req, res) => {
  const date = new Date();
  const month = date.getMonth() + 1;
  try {
    const orders = await db.Order.findAll({
      where: {
        [db.Sequelize.Op.and]: [
          db.Sequelize.where(
            db.Sequelize.fn("MONTH", db.Sequelize.col("Order.updatedAt")),
            month
          ),
          { status: "delivered" },
        ],
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
    });

    let totalQuantity = 0;
    let totalPrice = 0;
    let totalOrder = orders.length;

    orders.forEach((order) => {
      order.Order_Lines.forEach((orderLine) => {
        totalQuantity += orderLine.quantity;
        totalPrice += orderLine.quantity * orderLine.price;
      });
    });

    return res.status(200).json({
      message: "successful",
      sold: totalQuantity,
      total_revenue: totalPrice,
      total_order: totalOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createOrder,
  createOrderLine,
  getOrderByUserId,
  updateNewAdress,
  cancelOrder,
  getOrderByStatus,
  deliveryOrder,
  revenueForMonth,
};
