const crawler = require('../../services/crawler');
const sampleData = require('../../temp/sample.json');
const { sleep } = require('../../helpers/utils');
const User = require('../../models/user');
const dataProcessor = require('../../helpers/dataProcessor');
const Lock = require('../../helpers/mutex');
const lock = new Lock();

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
    if (isLocked)
      return response
        .status(409)
        .send({ message: `Your request is still processed.` });

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

      const rawData = await crawler(username);
      await sleep(1000);

      if (rawData.error) {
        await saveCrawledData(null, username, rawData.error);

        const message = `${username}: no data found.`;
        messagesArray.push(message);
        console.log(message);

        continue;
      }

      const data = dataProcessor(rawData);
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
    if (isLocked)
      return response
        .status(409)
        .send({ message: `Your request is still processed.` });

    const username = request.params.username;

    if (username === 'test') {
      const data = sampleData;

      await sleep(1000);

      lock.release(lockID);
      return response.status(200).send({ message: { data } });
    }

    const rawData = await crawler(username);

    if (rawData.error) {
      await sleep(1000);

      lock.release(lockID);
      return response.status(400).send({ message: { error: rawData.error } });
    }

    const data = dataProcessor(rawData);

    await sleep(1000);

    lock.release(lockID);
    response.status(200).send({ message: { data } });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
