// todo: saving logs into a file or db

const User = require('../models/user');
const crawler = require('../services/crawler/crawler');
const { sleep } = require('../helpers/utils');

const saveCrawledData = async (data, username, error) => {
  const query = { username: username };
  const update = { data: { releases: data, error: error } };
  const options = {
    useFindAndModify: false,
    upsert: true,
    new: true,
    setDefaultsOnInsert: true
  };

  await User.findOneAndUpdate(query, update, options);
};

const crawlingLoop = async users => {
  const messageLog = {};

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const username = user.username;

    if (!user.isVerified) {
      const message = `email is not verified.`;
      messageLog[username] = message;
      continue;
    }

    await sleep(1000); // prevent being banned for spamming requests

    const data = await crawler(username).catch(error =>
      console.error(error.message)
    );

    if (!data) {
      const message = `crawler service error.`;
      messageLog[username] = message;
      continue;
    }

    if (data.error) {
      await saveCrawledData(null, username, data.error);
      const message = `no data found.`;
      messageLog[username] = message;
    } else {
      await saveCrawledData(data, username, null);
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
    console.log(messageLog);
  } catch (error) {
    console.error(error);
  }
};

module.exports = massCrawling;
