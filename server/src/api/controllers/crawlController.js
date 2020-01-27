const crawler = require('../../services/crawler/crawler');
const sampleData = require('../../temp/sample.json');
const { sleep } = require('../../helpers/utils');
const User = require('../../models/user');
const lock = require('../../helpers/lock');
const { validateUsername } = require('../../helpers/utils');

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

// get all subscribed users crawled data
exports.everyone = async (request, response) => {
  try {
    const LOCK_ID = 0;
    const isLocked = lock.acquire(LOCK_ID);
    if (isLocked) {
      return response
        .status(429)
        .send({ message: `Your previous request is still processing.` });
    }

    const messagesArray = [];

    const users = await User.find();

    for (let i = 0; i < users.length; i++) {
      const username = users[i].username;

      if (!users[i].isVerified) {
        const message = `${username}: email is not verified.`;
        messagesArray.push(message);
        console.log(message);
        continue;
      }

      const data = await crawler(username);
      await sleep(1000);

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
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// get specified user crawled data
exports.specified = async (request, response) => {
  try {
    const lockID = request.ip;

    const isLocked = lock.acquire(lockID);
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
      lock.release(lockID);
      return response.status(200).send({ message: data });
    }

    // handle invalid username
    if (!validateUsername(username)) {
      lock.release(lockID);
      return response.status(400).send({
        message: `${username}: incorrect username format.`,
        error: true
      });
    }

    const data = await crawler(username);
    await sleep(1000);

    if (data.error) {
      lock.release(lockID);
      return response.status(400).send({ message: data.error, error: true });
    }

    lock.release(lockID);
    response.status(200).send({ message: data });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
