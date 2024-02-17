const orderController = require("../controllers/orderController");
const jwtAction = require("../middleware/jwtAction");
const order = (router) => {
  router.post("/orders", jwtAction.checkToken, orderController.createOrder);
  router.post(
    "/orders/order_line",
    jwtAction.checkToken,
    orderController.createOrderLine
  );
  router.get(
    "/orders/:user_id",
    jwtAction.checkToken,
    orderController.getOrderByUserId
  );
  router.put(
    "/orders/:order_id",
    jwtAction.checkToken,
    orderController.updateNewAdress
  );
  router.put(
    "/orders/cancel/:order_id",
    jwtAction.checkToken,
    orderController.cancelOrder
  );
};

module.exports = order;
