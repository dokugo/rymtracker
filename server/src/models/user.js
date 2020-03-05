const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  isVerified: Boolean,
  data: {
    releases: Array,
    error: String
  }
});

userSchema.methods.verify = async function() {
  await this.updateOne({ isVerified: true });
};

userSchema.statics.saveCrawledData = async function(data, email, error) {
  const query = { email: email };
  const update = { data: { releases: data, error: error } };
  const options = {
    useFindAndModify: false,
    upsert: true,
    new: true,
    setDefaultsOnInsert: true
  };
  const result = await this.findOneAndUpdate(query, update, options);
  return result;
};

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('User', userSchema);
