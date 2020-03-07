const crawler = require('../../services/crawler/crawler');
const { crawlingLoop } = require('../../jobs/massCrawling');
const User = require('../../models/user');
const sampleData = require('../../temp/sample.json');
const { sleep, validateUsername } = require('../../helpers/utils');
const lock = require('../../helpers/lock');

const LOCK_ID = 0;

// get all subscribed users crawled data
exports.everyone = async (request, response) => {
  try {
    const isLocked = lock.acquire(LOCK_ID);
    if (isLocked) {
      return response
        .status(429)
        .send({ message: `Your previous request is still processing.` });
    }

    const users = await User.find();
    if (!users) {
      return response.status(404).send({ message: 'Subscriptions not found.' });
    }

    const crawlingLog = await crawlingLoop(users);
    console.log(crawlingLog);

    lock.release(LOCK_ID);
    response.status(200).send({ message: crawlingLog });
  } catch (error) {
    lock.release(LOCK_ID);
    throw error;
  }
};

// get specified user crawled data
exports.specified = async (request, response) => {
  try {
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
  } catch (error) {
    lock.release(request.ip);
    throw error;
  }
};
