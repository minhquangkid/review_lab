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
  cart: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "product",
        require: true,
      },
      quantity: {
        type: Number,
        require: true,
        default: 1,
      },
    },
  ],
});

UserSchema.methods.addToCart = function (product) {
  let indexProduct = this.cart.findIndex((e) => e.productId == product._id);

  if (indexProduct == -1) {
    this.cart.push({
      productId: product._id,
      quantity: 1,
    });
  } else {
    this.cart[indexProduct].quantity++;
  }
  this.save();
};

module.exports = mongoose.model("User", UserSchema);
