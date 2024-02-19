var express = require("express");
var router = express.Router();
var brand = require("./brand");
var product = require("./product");
var auth = require("./auth");
var user = require("./user");
var cart = require("./cart");
var order = require("./order");
var review = require("./review");
brand(router);
product(router);
auth(router);
user(router);
cart(router);
order(router);
review(router);
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
