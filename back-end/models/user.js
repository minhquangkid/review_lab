const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    required: false,
    default: 18,
  },
});

module.exports = mongoose.model("User", UserSchema);
