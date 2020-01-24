const config = require('../../config/config');
const nodemailer = require('nodemailer');
const template = require('./template');

const transport = {
  host: config.smtp.host,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass
  }
};
const transporter = nodemailer.createTransport(transport);

const mailer = async (user, type) => {
  try {
    const message = await template.generate(user, type);
    const email = await transporter.sendMail(message);

    console.log('Message sent:');
    console.log(email);
  } catch (error) {
    console.log(error);
  }
};

module.exports = mailer;
