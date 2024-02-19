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
    "/orders/status_order/:status",
    jwtAction.checkToken,
    orderController.getOrderByStatus
  );
  router.get(
    "/orders/revenue",
    jwtAction.checkToken,
    orderController.revenueForMonth
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
  router.put(
    "/orders/delivery/:order_id",
    jwtAction.checkToken,
    orderController.deliveryOrder
  );
};

module.exports = order;
