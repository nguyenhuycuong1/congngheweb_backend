"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.User, { foreignKey: "user_id", targetKey: "id" });
      Review.belongsTo(models.Product, {
        foreignKey: "product_id",
        targetKey: "id",
      });
    }
  }
  Review.init(
    {
      user_id: DataTypes.UUID,
      product_id: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      comment: DataTypes.STRING(3000),
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
