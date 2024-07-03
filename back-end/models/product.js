const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductScheme = new Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.Model("Product", ProductScheme);
