const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const template = '../templates/email.ejs';

// require('dotenv').config();
// const pass = process.env.SMTP_API_KEY;
// const host = process.env.SMTP_HOST;

const transport = {
  // host: host,
  host: 'smtp.mailtrap.io',
  port: 587, // true for 465, false for other ports
  auth: {
    user: '1b344bf94c24a8',
    pass: '0c67fc31f9ab48'
  }
  /*       auth: {
    user: 'apikey',
    pass: pass
  } */
};
const transporter = nodemailer.createTransport(transport);

const getHtml = async user => {
  const templateData = {
    name: user.username
  };
  const templateDir = path.join(__dirname, '../templates/email.ejs');
  const html = ejs.renderFile(templateDir, templateData);
  return html;
};

const getOptions = async user => {
  const html = await getHtml(user);
  const options = {
    from: '"RYM Tracker" <mailer@rymtracker.ml>',
    to: user.email,
    subject: `💿 Upcoming releases for ${user.username}`,
    text: `Please use a client with HTML support.`,
    html: html
  };
  return options;
};

const mailer = async (user, release) => {
  try {
    const options = await getOptions(user);

    const message = await transporter.sendMail(options);

    console.log('Message sent:');
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

module.exports = mailer;
