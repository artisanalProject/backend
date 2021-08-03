const nodemailer = require("nodemailer");
const createError = require("http-errors");

const htmlMsg = require("../templates/email");

const setTransporter = async (message) => {
  const smtpMyMailConfig = {
    service: 'gmail',
    secure: true,
    auth: {
      user: "mokhleshaj@gmail.com",
      pass: "Mokhles 07212",
    },
    tls: {
      rejectUnauthorized: false,
    },
    maxConnections: 5,
    maxMessages: 10,
    rateLimit: 5,
  };

  const transporter = await nodemailer.createTransport(smtpMyMailConfig);
  transporter.sendMail(message, (error, info) => {
    if (error) {
      return createError.InternalServerError(error.message);
    }
  });
};

exports.sendAccessEmail = async (email, password) => {
    console.log(email);
  const link =`http://localhost:4200/auth/login`;
  const message = {
    from: "mokhleshaj@gmail.com",
    to: email,
    subject: "New Account",
    html: htmlMsg(email , password, link),
  };

  await setTransporter(message);
};