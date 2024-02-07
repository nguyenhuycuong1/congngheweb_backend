"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Brand, {
        foreignKey: "brand_id",
        targetKey: "id",
      });
      Product.hasOne(models.Cart_Item, { foreignKey: "product_id" });
      Product.hasOne(models.Order_Line, { foreignKey: "product_id" });
      Product.hasMany(models.Review, { foreignKey: "product_id" });
    }
  }
  Product.init(
    {
      product_name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.INTEGER,
      stars: DataTypes.FLOAT,
      image: DataTypes.STRING,
      brand_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
