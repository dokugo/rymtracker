console.clear();

const { APP_PORT, DB_URI, DB_OPTIONS } = require('./config/config');
const limiter = require('./helpers/limiter');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const usersRouter = require('./api/routers/usersRouter');
const crawlRouter = require('./api/routers/crawlRouter');
const mailRouter = require('./api/routers/mailRouter');
const { unknownEndpoint } = require('./helpers/utils');

app.set('trust proxy', 1);
app.use(limiter);
app.use(cors());
app.use(express.json());
app.use('/users', usersRouter);
app.use('/crawl', crawlRouter);
app.use('/mail', mailRouter);
app.use(unknownEndpoint);

const listen = () => {
  app.listen(APP_PORT);
  console.log(`Server is listening on port ${APP_PORT}.`);
};

const connect = () => {
  mongoose.connection
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen, console.log('Connected to the database.'));
  return mongoose.connect(DB_URI, DB_OPTIONS);
};

connect();
