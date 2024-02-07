const authController = require("../controllers/authController");
const { checkToken } = require("../middleware/jwtAction");

const auth = (router) => {
  router.post("/auth/register", authController.register);
  router.post("/auth/login", authController.login);
  router.get("/auth/logout", authController.logout);
  router.get("/auth/protected", checkToken, authController.protected);
};

module.exports = auth;
