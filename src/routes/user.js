const userController = require("../controllers/userController");

const user = (router) => {
  router.get("/users/:user_id", userController.getUserById);
};

module.exports = user;
