"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_Line extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order_Line.belongsTo(models.Order, {
        foreignKey: "order_id",
        targetKey: "id",
      });
      Order_Line.belongsTo(models.Product, {
        foreignKey: "product_id",
        targetKey: "id",
      });
    }
  }
  Order_Line.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      order_id: DataTypes.UUID,
      product_id: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order_Line",
    }
  );
  return Order_Line;
};
