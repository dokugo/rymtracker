const config = require('./config');
const mongoose = require('mongoose');

const URI = config.db.uri;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const database = async () => {
  try {
    await mongoose.connect(URI, options);
    console.log('Connected to the database.');
  } catch (error) {
    console.log('Error connecting to the database: ', error.message);
  }
};

module.exports = database;
