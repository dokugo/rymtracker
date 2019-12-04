const nodemailer = require('nodemailer');

require('dotenv').config();
const pass = process.env.SMTP_API_KEY;
const host = process.env.SMTP_HOST;

const mailer = async (user, release) => {
  try {
    const transporter = nodemailer.createTransport({
      host: host,
      port: 587,
      auth: {
        user: 'apikey',
        pass: pass
      }
    });

    const info = await transporter.sendMail({
      from: '"RYM Tracker" <mailer@rymtracker.ml>',
      to: user.email,
      subject: `💿 Upcoming releases for ${user.username}`,
      text: `${release[4].artists[0].text}`,
      html: `
      <b>
        Artist: ${release[4].artists[0].text}
      </b>
      <br>
      <b>
        Album: ${release[4].album.text}
      </b>
      `
    });

    // console.log('Message sent: %s', info.messageId);
    console.log('Message sent:');
    console.log(info);
  } catch (error) {
    console.log(error);
  }
};

module.exports = mailer;
