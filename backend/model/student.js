const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  id: {
    type: String
  },
  image: {
    type: String
  },
  name: {
    type: String
  },
  size: {
    type: String
  }
}, {
  versionKey: false
  , timestamps: true
})

module.exports = mongoose.model('Student', studentSchema);