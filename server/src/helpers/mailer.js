const nodemailer = require('nodemailer');

async function main() {
  try {
    const transporter = nodemailer.createTransport({
      host: 'in-v3.mailjet.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: '',
        pass: ''
      }
    });

    const info = await transporter.sendMail({
      from: '"RYM Tracker 💿" <releases@rymtracker.now.sh>',
      to: '@gmail.com',
      subject: 'Hello',
      text: 'Hello world',
      html: '<b>Hello world</b>'
    });

    // console.log('Message sent: %s', info.messageId);
    console.log('Message sent: %s', info);
  } catch (error) {
    console.log(error);
  }
}

main();
