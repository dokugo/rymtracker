const nodemailer = require('nodemailer');

require('dotenv').config();
const pass = process.env.SMTP_API_KEY;

const mailer = async data => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: {
        user: 'apikey',
        pass: pass
        /* pass:
          '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' */
      }
    });

    const info = await transporter.sendMail({
      from: '"RYM Tracker" <mailer@rymtracker.ml>',
      to: data.email,
      subject: `💿 Upcoming releases for ${data.username}`,
      text: `New releases weekly update: ${data.username}`,
      html: `<b>New releases weekly update: ${data.username}</b>`
    });

    // console.log('Message sent: %s', info.messageId);
    console.log('Message sent: %s', info);
  } catch (error) {
    console.log(error);
  }
};

module.exports = mailer;
