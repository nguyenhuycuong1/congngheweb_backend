const db = require("../models/index");

const getUserById = async (req, res) => {
  const user_id = req.params.user_id;
  const user = await db.User.findOne({
    where: {
      id: user_id,
    },
    attributes: {
      exclude: ["password"],
    },
    include: {
      model: db.Cart,
      attributes: {
        exclude: ["user_id", "createdAt", "updatedAt"],
      },
    },
  });
  return res.status(200).json({
    message: "successful",
    user,
  });
};

module.exports = {
  getUserById,
};
