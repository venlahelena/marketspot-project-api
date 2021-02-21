const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Users Schema
const UsersSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phonenumber: {
      type: Number,
      required: true
  },
    password: {
      type: String,
      required: true
  },
    register_date: {
      type: Date,
      default: Date.now
  }
});

module.exports = Users = mongoose.model('users', UsersSchema);