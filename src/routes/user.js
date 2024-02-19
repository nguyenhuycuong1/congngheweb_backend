const userController = require("../controllers/userController");
const { checkToken } = require("../middleware/jwtAction");
const user = (router) => {
  router.delete("/users/:user_id", checkToken, userController.deleteUser);
  router.get("/users/new_users", userController.getNewUserInMonth);
  router.get("/users", checkToken, userController.getAllUsers);
  router.get(
    "/users/admin/:user_id",
    checkToken,
    userController.getUserByIdAdmin
  );
  router.get("/users/:user_id", checkToken, userController.getUserById);
};

module.exports = user;
