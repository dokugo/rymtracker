const express = require('express');
const router = express.Router();

const crawler = require('../helpers/crawler');
const reduce = require('../helpers/reducer');
const sampleData = require('../sample.json');

const Release = require('../models/release');
const User = require('../models/user');

// GET all subscribed users crawled data
router.get('/subscribed', async (request, response) => {
  try {
    const users = await User.find({});
    const usernames = users.map(item => item.username);

    console.log(usernames);

    for (let i = 0; i < usernames.length; i++) {
      const rawData = await crawler(usernames[i]);

      if (rawData.error) {
        const release = new Release({
          username: usernames[i],
          data: null,
          error: rawData.error
        });

        await release.save();
      } else {
        const data = reduce(rawData);
        const release = new Release({
          username: usernames[i],
          data: data
        });

        await release.save();
      }
    }

    response.status(200).send({ messge: 'OK', usernames: usernames });
  } catch (error) {
    console.log(error);
  }
});

// GET specified user crawled data
router.get('/:id', async (request, response) => {
  try {
    if (request.params.id === 'test') {
      return response.status(200).send(sampleData);
    }

    const username = request.params.id;
    const rawData = await crawler(username);
    if (rawData.error) {
      return response.status(400).send({ error: rawData.error });
    }
    const data = reduce(rawData);

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
