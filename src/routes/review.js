const { checkToken } = require("../middleware/jwtAction");
const reviewController = require("../controllers/reviewController");
const review = (router) => {
  router.post("/reviews", checkToken, reviewController.createReview);
};

module.exports = review;
