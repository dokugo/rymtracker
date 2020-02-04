const { SMTP_HOST, SMTP_USER, SMTP_PASS } = require('../../config/config');
const nodemailer = require('nodemailer');
const template = require('./template');

const transport = {
  host: SMTP_HOST,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
};
const transporter = nodemailer.createTransport(transport);

const mailer = async (user, type) => {
  const message = await template.generate(user, type);
  const email = await transporter.sendMail(message);
  return email;
};

module.exports = mailer;
