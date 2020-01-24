const nodemailer = require('nodemailer');
const template = require('./template');

const config = require('./config/config');

const host = config.smtp.dev.host || config.smtp.prod.host;
const user = config.smtp.dev.user || config.smtp.prod.user;
const pass = config.smtp.dev.pass || config.smtp.prod.pass;

const transport = {
  host: host,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: user,
    pass: pass
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
