const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "crabserg@meta.ua",
    pass: META_PASSWORD,
},
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
try {
  const email = { ...data, from: "crabserg@meta.ua" };
  await transporter.sendMail(email);
  return true;
} catch (error) {
  console.log(error);
  throw error;
}
};



module.exports = sendEmail;