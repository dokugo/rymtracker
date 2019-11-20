console.clear();

const express = require('express');
const cors = require('cors');

const rym = require('./rym');
const sampleData = require('./sample.json');

const PORT = process.env.PORT || 9000;
const app = express();
app.use(cors());
app.use(express.json());
app.listen(PORT, () => console.log(`rymtracker app listening on port ${PORT}`));

app.get('/rym/:id', async (req, res) => {
  try {
    const username = req.params.id;
    const data = await rym(username);
    // console.log(data);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
});

app.get('/test/', async (req, res) => {
  try {
    res.status(200).send(sampleData);
  } catch (error) {
    console.log(error);
  }
});
