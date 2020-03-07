const User = require('../models/user');
const crawler = require('../services/crawler/crawler');
const { sleep } = require('../helpers/utils');

const crawlingLoop = async users => {
  const messageLog = {};

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const username = user.username;
    const email = user.email;

    if (!user.isVerified) {
      const message = `email is not verified.`;
      messageLog[username] = message;
      continue;
    }

    await sleep(1000); // prevent being banned for spamming requests
    const data = await crawler(username);

    if (!data) {
      const message = `crawler service error.`;
      messageLog[username] = message;
      continue;
    }

    if (data.error) {
      await User.saveCrawledData(null, email, data.error);
      const message = `no data found.`;
      messageLog[username] = message;
    } else {
      await User.saveCrawledData(data, email, null);
      const message = `crawling successful.`;
      messageLog[username] = message;
    }
  }

  return messageLog;
};

const massCrawling = async () => {
  try {
    const users = await User.find();

    if (!users) {
      console.log('Subscriptions not found.');
      return;
    }

    const messageLog = await crawlingLoop(users);
    return messageLog;
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = { crawlingLoop, massCrawling };
