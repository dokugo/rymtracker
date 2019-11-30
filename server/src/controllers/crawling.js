const express = require('express');
const router = express.Router();

const crawler = require('../helpers/crawler');
const reduce = require('../helpers/reducer');
const sampleData = require('../sample.json');

const Release = require('../models/release');

// GET actual crawled user data
router.get('/:id', async (request, response) => {
  try {
    if (request.params.id === 'test') {
      return response.status(200).send(sampleData);
    }

    const username = request.params.id;
    const rawData = await crawler(username);
    const data = reduce(rawData);

    const release = new Release({
      username: username,
      data: data
    });

    const savedData = await release.save();
    response.status(200).send(savedData);

    // console.log(data);
    // response.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
