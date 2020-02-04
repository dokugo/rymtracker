// todo: saving logs into a file or db

const User = require('../models/user');
const mailer = require('../services/mailer/mailer');
const { sleep } = require('../helpers/utils');

const mailingLoop = async users => {
  const messageLog = {};

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const email = user.email;

    if (!user.isVerified) {
      const message = `email is not verified.`;
      messageLog[email] = message;
      continue;
    }

    const releases = user.data && user.data.releases;

    if (!releases) {
      const message = `no data found.`;
      messageLog[email] = message;
      continue;
    }

    await sleep(1000); // prevent being banned for spamming requests

    const letterSent = await mailer(user, 'releases').catch(error =>
      console.error(error.message)
    );

    if (!letterSent) {
      const message = `mailer service error.`;
      messageLog[email] = message;
      continue;
    } else {
      const message = `mailing successful.`;
      messageLog[email] = message;
    }
  }

  return messageLog;
};

const massMailing = async () => {
  try {
    const users = await User.find();

    if (!users) {
      console.log('Subscriptions not found.');
      return;
    }

    const messageLog = await mailingLoop(users);
    console.log(messageLog);
  } catch (error) {
    console.error(error);
  }
};

module.exports = massMailing;
