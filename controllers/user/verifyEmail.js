const { NotFound } = require("http-errors");

const User = require("../../models/users");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  console.log('~verificationToken verifyEmail.js [7]:', verificationToken);
  const user = await User.findOne({ verificationToken });
  console.log('~user verifyEmail.js [9]:', user);
  if (!user) {
    throw NotFound();
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  res.json({ message: "verify success" });
};

module.exports = verifyEmail;
