const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const User = require("../../models/users");

const register = async (req, res, next) => {
  
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict({ message: "Email in use" });
    }

    const avatarURL = await gravatar.url(email, {protocol: 'http', s: '100'});
    console.log (avatarURL)
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({
      name,
      email,
      avatarURL,
      password: hashPassword,
      subscription: "starter",
      });
    res.status(201).json(result);
};

module.exports = register;
