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

const getSubject = (type, user) => {
  let subject;
  switch (type) {
    case 'releases':
      subject = `💿 Upcoming releases for ${user.username}`;
      break;
    case 'verification':
      subject = `❓ Please verify your subscription to ${user.username}`;
      break;
  }
  return subject;
};

const getHtml = async (user, type, data) => {
  const templateData = {
    user: user,
    data: data
  };

  let templateDir;
  switch (type) {
    case 'releases':
      templateDir = path.join(__dirname, '../templates/releases.ejs');
      break;
    case 'verification':
      templateDir = path.join(__dirname, '../templates/verification.ejs');
      break;
  }

  const html = await ejs.renderFile(templateDir, templateData);
  return html;
};

const getOptions = async (user, subject, html) => {
  const options = {
    from: '"RYM Tracker" <mailer@rymtracker.ml>',
    to: user.email,
    subject: subject,
    text: `Please use a client with HTML support.`,
    html: html
  };
  return options;
};

const mailer = async (user, type, data) => {
  try {
    const subject = getSubject(type, user);
    const html = await getHtml(user, type, data);

    const options = await getOptions(user, subject, html);

    const message = await transporter.sendMail(options);

    console.log('Message sent:');
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

/* const verify = async user => {
  try {
    const options = await getOptions(user, 'verification');
    const message = await transporter.sendMail(options);

    console.log('Message sent:');
    console.log(message);
  } catch (error) {
    console.log(error);
  }
}; */

module.exports = mailer;
