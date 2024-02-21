const { checkToken } = require("../middleware/jwtAction");
const reviewController = require("../controllers/reviewController");
const review = (router) => {
  router.post("/reviews", checkToken, reviewController.createReview);
  router.delete(
    "/reviews/:review_id",
    checkToken,
    reviewController.deleteReview
  );
};

module.exports = review;
