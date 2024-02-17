const userController = require("../controllers/userController");
const { checkToken } = require("../middleware/jwtAction");
const user = (router) => {
  router.get("/users/:user_id", checkToken, userController.getUserById);
};

module.exports = user;
