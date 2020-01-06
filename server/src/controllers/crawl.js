const express = require('express');
const router = express.Router();

const crawler = require('../services/crawler');
const reduce = require('../helpers/reducer');
const filter = require('../helpers/duplicateFilter');
const sampleData = require('../sample.json');

const User = require('../models/user');

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

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

// GET all subscribed users crawled data
router.get('/everyone', async (request, response) => {
  try {
    const responseMessages = [];

    const users = await User.find();
    const usernames = users.map(item => item.username);

    console.log(usernames);

    for (let i = 0; i < usernames.length; i++) {
      if (!users[i].isVerified) {
        const message = `${usernames[i]}: email is not verified.`;
        responseMessages.push(message);
        console.log(message);
        continue;
      }

      await sleep(1000);
      const rawData = await crawler(usernames[i]);

      if (rawData.error) {
        const message = `${usernames[i]}: no data.`;
        responseMessages.push(message);
        console.log(message);

        await saveCrawledData(null, usernames[i], rawData.error);
      } else {
        const message = `${usernames[i]}: crawling successful.`;
        responseMessages.push(message);
        console.log(message);

        const data = filter(reduce(rawData));
        await saveCrawledData(data, usernames[i], null);
      }
    }

    response.status(200).send({ message: responseMessages });
  } catch (error) {
    console.log(error);
  }
});

// GET specified user crawled data
router.get('/:id', async (request, response) => {
  try {
    if (request.params.id === 'test') {
      const data = filter(sampleData);
      await sleep(1000);
      return response.status(200).send({ data });
    }

    const username = request.params.id;

    await sleep(1000);
    const rawData = await crawler(username);

    if (rawData.error) {
      return response.status(400).send({ message: rawData.error });
    }
    const data = filter(reduce(rawData));

    response.status(200).send({ data });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
