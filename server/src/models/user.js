const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

// console.log('Connecting to', url);

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('Connected to the database.');
  })
  .catch(error => {
    console.log('Error connecting to the database: ', error.message);
  });

const userSchema = new mongoose.Schema({
  username: String,
  email: String
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('User', userSchema);
