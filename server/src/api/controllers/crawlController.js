const crawler = require('../../services/crawler');
const sampleData = require('../../temp/sample.json');
const { sleep } = require('../../helpers/utils');
const User = require('../../models/user');
const dataProcessor = require('../../helpers/dataProcessor');

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

      await sleep(1000);
      const rawData = await crawler(username);

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

    response.status(200).send({ message: messagesArray });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// get specified user crawled data
exports.specified = async (request, response) => {
  try {
    const username = request.params.username;

    if (username === 'test') {
      const data = sampleData;
      await sleep(1000);
      return response.status(200).send({ message: { data } });
    }

    const rawData = await crawler(username);

    if (rawData.error) {
      return response.status(400).send({ message: { error: rawData.error } });
    }

    const data = dataProcessor(rawData);

    response.status(200).send({ message: { data } });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
