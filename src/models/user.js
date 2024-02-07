"use strict";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Cart, { foreignKey: "user_id" });
      User.hasMany(models.Order, { foreignKey: "user_id" });
      User.hasMany(models.Review, { foreignKey: "user_id" });
      User.addHook("afterCreate", async (user) => {
        try {
          await models.Cart.create({ user_id: user.id });
        } catch (error) {
          console.error(error);
        }
      });
    }
  }
  User.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      role: { type: DataTypes.STRING, defaultValue: "user" },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
