const db = require("../models/index");
const { hashPassword, comparePassword } = require("../middleware/bcryptAction");
const { createToken } = require("../middleware/jwtAction");

const register = async (req, res) => {
  const { username, first_name, last_name, password, phone, email } = req.body;
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const existingUser = await db.User.findOne({
    where: {
      username: username,
    },
  });
  if (!username) {
    return res.status(500).json({
      message: "Please enter an username",
    });
  }
  if (existingUser) {
    return res.status(500).json({
      message: "Username is already taken",
    });
  }
  if (!first_name || !last_name) {
    return res.status(500).json({
      message: "Please enter your name",
    });
  }
  if (!phone) {
    return res.status(500).json({
      message: "Please enter your phone number",
    });
  }
  if (!email) {
    return res.status(500).json({
      message: "Please enter your email address",
    });
  }
  if (!email.match(re)) {
    return res.status(500).json({
      message: "Invalid Email",
    });
  }
  if (!password) {
    return res.status(500).json({
      message: "Please enter a password",
    });
  }

  const hPassword = await hashPassword(password);

  await db.User.create({
    username,
    first_name,
    last_name,
    password: hPassword,
    phone,
    email,
  });
  return res.status(200).json({
    message: "Sign Up Success",
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await db.User.findOne({
    where: {
      username: username,
    },
  });
  let cpPassword = await comparePassword(password, user.dataValues.password);

  if (!user || !cpPassword) {
    return res.status(401).json({
      message: "Invalid username or password",
    });
  }

  const payload = {
    user_id: user.id,
    username: user.username,
    role: user.role,
    expiresIn: process.env.JWT_EXPIRES_IN,
  };
  const token = await createToken(payload);
  res.cookie("jwt", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
  return res.status(200).json({
    message: "Login successful",
    token: token,
  });
};

const logout = async (req, res) => {
  await res.clearCookie("jwt");
  return res
    .status(200)
    .json({
      message: "Logout successful",
    })
    .end();
};

const protected = (req, res) => {
  return res.status(200).json({
    message: "protected route",
    user: req.user,
  });
};

module.exports = {
  register,
  login,
  logout,
  protected,
};
