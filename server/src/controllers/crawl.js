const express = require('express');
const router = express.Router();

const crawler = require('../services/crawler');
const reduce = require('../helpers/reducer');
const filter = require('../helpers/duplicateFilter');
const sampleData = require('../sample.json');

const Release = require('../models/release');
const User = require('../models/user');

const saveCrawledData = async (data, username, error) => {
  const query = { username: username };
  const update = { data: data, error: error };
  const options = {
    useFindAndModify: false,
    upsert: true,
    new: true,
    setDefaultsOnInsert: true
  };

  await Release.findOneAndUpdate(query, update, options);
};

// GET all subscribed users crawled data
router.get('/everyone', async (request, response) => {
  try {
    const users = await User.find();
    const usernames = users.map(item => item.username);

    console.log(usernames);

    for (let i = 0; i < usernames.length; i++) {
      if (!users[i].isVerified) {
        console.log(`${users[i].email} is not verified.`);
        continue;
      }

      const rawData = await crawler(usernames[i]);

      if (rawData.error) {
        console.log(`No data for ${usernames[i]}.`);
        await saveCrawledData(null, usernames[i], rawData.error);
      } else {
        console.log(`Crawled data for ${usernames[i]}.`);
        const data = reduce(rawData);
        await saveCrawledData(data, usernames[i], null);
      }
    }

    response.status(200).send({ message: 'OK', usernames: usernames });
  } catch (error) {
    console.log(error);
  }
});

// GET specified user crawled data
router.get('/:id', async (request, response) => {
  try {
    if (request.params.id === 'test') {
      return response.status(200).send(filter(sampleData));
    }

    const username = request.params.id;
    const rawData = await crawler(username);
    if (rawData.error) {
      return response.status(400).send({ message: rawData.error });
    }
    const data = filter(reduce(rawData));

    /*     const release = new Release({
      username: username,
      data: data
    });

    const savedData = await release.save();
    response.status(200).send(savedData); */

    response.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
