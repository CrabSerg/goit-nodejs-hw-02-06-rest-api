const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { uid } = require("uid");

const User = require("../../models/users");
const sendEmail = require("../../helpers/sendEmail");

const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict({ message: "Email in use" });
    }

    const avatarURL = await gravatar.url(email, {protocol: 'http', s: '100'});
    
    const verificationToken = uid();

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({
      name,
      email,
      avatarURL,
      password: hashPassword,
      subscription: "starter",
      verificationToken,
      });

      const mail = {
        to: email,
        subject: "Авторизація електронної пошти",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Підтвердити email</a>`,
      };
      await sendEmail(mail);

    res.status(201).json(result);
};

module.exports = register;
