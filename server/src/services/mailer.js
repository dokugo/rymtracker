const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

require('dotenv').config();
const host = process.env.SMTP_HOST__PROD || process.env.SMTP_HOST;
const user = process.env.SMTP_USER__PROD || process.env.SMTP_USER;
const pass = process.env.SMTP_PASS__PROD || process.env.SMTP_PASS;

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

const getHtml = async (user, releases) => {
  const templateData = {
    user: user,
    releases: releases
  };

  const templateDir = path.join(__dirname, '../templates/email.ejs');

  const html = await ejs.renderFile(templateDir, templateData);

  return html;
};

const getOptions = async (user, releases) => {
  const html = await getHtml(user, releases);

  const options = {
    from: '"RYM Tracker" <mailer@rymtracker.ml>',
    to: user.email,
    subject: `💿 Upcoming releases for ${user.username}`,
    text: `Please use a client with HTML support.`,
    html: html
  };

  return options;
};

const mailer = async (user, releases) => {
  try {
    const options = await getOptions(user, releases);

    const message = await transporter.sendMail(options);

    console.log('Message sent:');
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

module.exports = mailer;
