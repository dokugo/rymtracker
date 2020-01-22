const nodemailer = require('nodemailer');
// const ejs = require('ejs');
// const path = require('path');

/* const GetTemplate = require('./getTemplate');
const template = new GetTemplate(); */
const template = require('./template');

require('dotenv').config();
const host = process.env.SMTP_HOST_DEV || process.env.SMTP_HOST_PROD;
const user = process.env.SMTP_USER_DEV || process.env.SMTP_USER_PROD;
const pass = process.env.SMTP_PASS_DEV || process.env.SMTP_PASS_PROD;

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
