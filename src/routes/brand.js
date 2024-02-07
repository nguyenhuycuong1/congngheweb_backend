const brandController = require("../controllers/brandController");

function brand(router) {
  router.get("/brands", brandController.getAllBrands);
}

module.exports = brand;
