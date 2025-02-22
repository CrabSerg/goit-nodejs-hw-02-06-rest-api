const getCurrent = async (req, res, next) => {
  const { name, email } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        name,
        email,
        subscription: "starter",
      },
    },
  });
};

module.exports = getCurrent;
