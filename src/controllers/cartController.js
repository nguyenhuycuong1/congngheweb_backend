const db = require("../models/index");

const getCartItems = async (req, res) => {
  const { user_id } = req.params;
  const cartItems = await db.Cart.findOne({
    where: {
      user_id: user_id,
    },
    include: {
      model: db.Cart_Item,
      include: {
        model: db.Product,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "product_id", "cart_id"],
      },
    },
    attributes: {
      exclude: ["createdAt", "updatedAt", "user_id"],
    },
  });
  return res.status(200).json({
    message: "successful",
    data: cartItems,
  });
};

const addCartItem = async (req, res) => {
  const { cart_id, product_id, quantity, price } = req.body;
  const cartItem = await db.Cart_Item.findOne({
    where: {
      cart_id: cart_id,
      product_id: product_id,
    },
  });
  const totalPrice = quantity * price;
  if (cartItem) {
    let newQuantity = cartItem.quantity + quantity;
    let newPrice = newQuantity * price;
    try {
      await db.Cart_Item.update(
        {
          quantity: newQuantity,
          price: newPrice,
        },
        {
          where: {
            cart_id: cart_id,
            product_id: product_id,
          },
        }
      );
      return res.status(200).json({ message: "successful" });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
  try {
    await db.Cart_Item.create({
      cart_id: cart_id,
      product_id: product_id,
      quantity: quantity,
      price: totalPrice,
    });
    return res.status(200).json({ message: "successful" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const updateQuantity = async (req, res) => {
  const { cart_item_id } = req.params;
  const { quantity, price } = req.body;

  let newPrice = quantity * price;
  try {
    await db.Cart_Item.update(
      { quantity: quantity, price: newPrice },
      {
        where: {
          id: cart_item_id,
        },
      }
    );

    return res.status(200).json({
      message: "success",
      quantity: quantity,
      price: newPrice,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const deleteCartItem = async (req, res) => {
  const { cart_item_id } = req.params;
  try {
    await db.Cart_Item.destroy({ where: { id: cart_item_id } });
    return res.status(200).json({ message: "successful" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = { addCartItem, getCartItems, updateQuantity, deleteCartItem };
