const cartController = require("../controllers/cartController");
const jwtAction = require("../middleware/jwtAction");

const cart = (router) => {
  router.post("/carts/add", jwtAction.checkToken, cartController.addCartItem);
  router.put(
    "/carts/quantity/:cart_item_id",
    jwtAction.checkToken,
    cartController.updateQuantity
  );
  router.delete("/carts/delete_ordered", cartController.deleteCartOrdered);
  router.delete(
    "/carts/:cart_item_id",
    jwtAction.checkToken,
    cartController.deleteCartItem
  );
  router.get(
    "/carts/:user_id",
    jwtAction.checkToken,
    cartController.getCartItems
  );
};

module.exports = cart;
