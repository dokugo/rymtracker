const mongoose = require('mongoose');

const releaseSchema = new mongoose.Schema({
  username: String,
  data: Object
});

releaseSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Release', releaseSchema);
