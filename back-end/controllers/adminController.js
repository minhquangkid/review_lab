exports.getHome = (req, res, next) => {
  res.status(200).send(true);
};

exports.addUser = (req, res, next) => {
  console.log(req.body);
  res.redirect("http://localhost:3000");
};
