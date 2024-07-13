const User = require("../models/user.js");
const Product = require("../models/product.js");

const commonFc = require("../ulti.js");
const io = require("../socket.io.js");

exports.getHome = (req, res, next) => {
  User.find()
    .populate("cart.productId")
    // .exec() // dùng hay ko dùng thì kết quả cũng vậy
    .then((r) => {
      // console.log(r);
      res.status(200).send(r);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find().then((r) => {
    res.status(200).send(r);
  });
};

exports.addProduct = (req, res, next) => {
  console.log(req.body);
  console.log(req.file);

  const newProduct = new Product();
  newProduct.name = req.body.name;
  newProduct.price = req.body.price;

  newProduct
    .save()
    .then((result) => {
      res.status(200).send(newProduct);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addUser = (req, res, next) => {
  console.log(req.body);

  const newUser = new User();
  newUser.userName = req.body.userName;

  if (!commonFc.isNullOrEmpty(req.body.address)) {
    newUser.address = req.body.address;
  }

  if (!commonFc.isNullOrEmpty(req.body.age)) {
    newUser.age = req.body.age;
  }

  newUser
    .save()
    .then((result) => {
      // io.getIO().emit("posts", "emit from socket");
      res.status(200).send(newUser);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.buyProduct = (req, res, next) => {
  console.log(req.body);
  console.log(req.params.userId);

  User.findById(req.params.userId)
    .then((user) => {
      return user.addToCart(req.body);
    })
    .then((r) => {
      res.status(200).send(true);
    });
};

exports.editUser = (req, res, next) => {
  console.log(req.body);

  User.findByIdAndUpdate(req.body._id, {
    // tìm cách tốt hơn để update nguyên 1 object
    userName: req.body.userName,
    age: req.body.age,
    address: req.body.address,
  }).then((e) => {
    console.log(e);
    res.status(200).send(true);
  });
};

exports.deleteUser = (req, res, next) => {
  console.log(req.params);

  User.findByIdAndDelete({ _id: req.params.id }).then((e) => {
    console.log(e);
    res.status(200).send(true);
  });
};
