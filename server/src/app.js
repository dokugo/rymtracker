console.clear();

const config = require('./config/config');

const database = require('./config/db');
database();

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

const { unknownEndpoint } = require('./helpers/utils');
app.use(unknownEndpoint);

const PORT = process.env.PORT || config.app.port;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}.`));
