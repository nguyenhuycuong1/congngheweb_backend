var express = require("express");
var router = express.Router();
var brand = require("./brand");
var product = require("./product");
var auth = require("./auth");
var user = require("./user");
var cart = require("./cart");
brand(router);
product(router);
auth(router);
user(router);
cart(router);
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
