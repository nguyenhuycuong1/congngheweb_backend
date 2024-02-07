const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const hashPassword = async (password) => {
  return await bcrypt.hashSync(password, salt);
};

const comparePassword = async (userPassword, dbPassword) => {
  return await bcrypt.compareSync(userPassword, dbPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
