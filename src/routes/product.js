const productController = require("../controllers/productController");

const product = (router) => {
  router.get("/products", productController.getAllProducts);
  router.get("/products/brand/:brandId", productController.getProductsByBrand);
  router.get("/products/price/:orderBy", productController.getProductsByPrice);
  router.post("/products/search", productController.getProductsSearchResult);
  router.put("/products/:product_id", productController.updateProductInfo);
  router.get("/products/:prodId", productController.getProductById);
};

module.exports = product;
