const User = require("../models/user.js");

const commonFc = require("../ulti.js");

exports.getHome = (req, res, next) => {
  User.find().then((r) => {
    console.log(r);
    res.status(200).send(r);
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
      res.status(200).send(newUser);
    })
    .catch((err) => {
      console.log(err);
    });
};
