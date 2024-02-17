var jwt = require("jsonwebtoken");
const privateKey = process.env.ACCESS_TOKEN_SECRET;
const createToken = async (payload) => {
  let token = null;
  try {
    token = await jwt.sign(payload, privateKey);
  } catch (error) {
    console.log(error);
  }

  return token;
};

const verifyToken = (token) => {
  let data = null;
  jwt.verify(token, privateKey, (err, decoded) => {
    if (err) {
      console.log(err);
      return data;
    }
    data = decoded;
  });
  return data;
};

const checkToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(400).json({ error: "Access denied" });
  try {
    const decoded = await verifyToken(token);
    req.user = {
      user_id: decoded.user_id,
      username: decoded.username,
      role: decoded.role,
      iat: decoded.iat,
    };
    next();
  } catch (error) {
    return res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = {
  createToken,
  verifyToken,
  checkToken,
};
