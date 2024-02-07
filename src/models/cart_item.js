"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart_Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart_Item.belongsTo(models.Cart, {
        foreignKey: "cart_id",
        targetKey: "id",
      });
      Cart_Item.belongsTo(models.Product, {
        foreignKey: "product_id",
        targetKey: "id",
      });
    }
  }
  Cart_Item.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      cart_id: DataTypes.UUID,
      product_id: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cart_Item",
    }
  );
  return Cart_Item;
};
