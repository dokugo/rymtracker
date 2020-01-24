console.clear();

const config = require('./config/config');

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const usersRouter = require('./api/routers/usersRouter');
const crawlRouter = require('./api/routers/crawlRouter');
const mailRouter = require('./api/routers/mailRouter');
app.use('/users', usersRouter);
app.use('/crawl', crawlRouter);
app.use('/mail', mailRouter);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ message: 'Unknown endpoint.' });
};
app.use(unknownEndpoint);

const PORT = process.env.PORT || config.app.port;

const listen = () => {
  app.listen(PORT);
  console.log(`Server is listening on port ${PORT}.`);
};

const connect = () => {
  mongoose.connection
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen, console.log('Connected to the database.'));
  return mongoose.connect(config.db.uri, config.db.options);
};

connect();
