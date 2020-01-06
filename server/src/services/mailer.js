const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

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

const getSubject = (type, user) => {
  let subject;
  switch (type) {
    case 'releases':
      subject = `💿 Upcoming releases for ${user.username}`;
      break;
    case 'verification':
      subject = `❓ Please confirm subscription to ${user.username}`;
      break;
    case 'update':
      subject = `❓ Please confirm subscription update to ${user.username}`;
      break;
  }
  return subject;
};

const getHtml = async (user, type) => {
  let templateData = {
    user: user,
    data: user.data.releases
  };

  let templateDir;
  switch (type) {
    case 'releases':
      templateDir = path.join(__dirname, '../templates/releases.ejs');
      break;
    case 'verification':
      templateData = {
        ...templateData,
        link: `https://rymtracker.ml/user/verify/${user.id}`,
        text: ``
      };
      templateDir = path.join(__dirname, '../templates/confirmation.ejs');
      break;
    case 'update':
      templateData = {
        ...templateData,
        link: `https://rymtracker.ml/user/update/${user.id}`,
        text: `update`
      };
      templateDir = path.join(__dirname, '../templates/confirmation.ejs');
      break;
  }

  const html = await ejs.renderFile(templateDir, templateData);
  return html;
};

const getOptions = async (user, subject, html) => {
  const options = {
    from: '"RYM Tracker" <no-reply@rymtracker.ml>',
    to: user.email,
    subject: subject,
    text: `Please use a client with HTML support.`,
    html: html
  };
  return options;
};

const mailer = async (user, type) => {
  try {
    const subject = getSubject(type, user);
    const html = await getHtml(user, type);

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
