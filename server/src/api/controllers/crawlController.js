const crawler = require('../../services/crawler/crawler');
const User = require('../../models/user');
const sampleData = require('../../temp/sample.json');
const { sleep, validateUsername } = require('../../helpers/utils');
const lock = require('../../helpers/lock');

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

const LOCK_ID = 0;

// get all subscribed users crawled data
exports.everyone = async (request, response) => {
  const isLocked = lock.acquire(LOCK_ID);
  if (isLocked) {
    return response
      .status(429)
      .send({ message: `Your previous request is still processing.` });
  }

  const messagesArray = [];

  const users = await User.find();

  if (!users) {
    return response.status(404).send({ message: 'Subscriptions not found.' });
  }

  for (let i = 0; i < users.length; i++) {
    const username = users[i].username;

    if (!users[i].isVerified) {
      const message = `${username}: email is not verified.`;
      messagesArray.push(message);
      console.log(message);
      continue;
    }

    const data = await crawler(username);
    await sleep(1000); // 1 second pause to prevent being banned for spamming requests

    if (data.error) {
      await saveCrawledData(null, username, data.error);

      const message = `${username}: no data found.`;
      messagesArray.push(message);
      console.log(message);

      continue;
    }

    await saveCrawledData(data, username, null);

    const message = `${username}: crawling successful.`;
    messagesArray.push(message);
    console.log(message);
  }

  lock.release(LOCK_ID);
  response.status(200).send({ message: messagesArray });
};

// get specified user crawled data
exports.specified = async (request, response) => {
  const lockId = request.ip;

  const isLocked = lock.acquire(lockId);
  if (isLocked) {
    return response.status(429).send({
      message: `Your previous request is still processing.`,
      error: true
    });
  }

  const username = request.params.username;

  if (username === 'tt') {
    const data = sampleData;
    await sleep(1000);
    lock.release(lockId);
    return response.status(200).send({ message: data });
  }

  // handle invalid username
  if (!validateUsername(username)) {
    lock.release(lockId);
    return response.status(400).send({
      message: `${username}: incorrect username format.`,
      error: true
    });
  }

  const data = await crawler(username);
  await sleep(1000); // in case someone is spamming /crawl/:username route

  if (data.error) {
    lock.release(lockId);
    return response.status(400).send({ message: data.error, error: true });
  }

  lock.release(lockId);
  response.status(200).send({ message: data });
};
