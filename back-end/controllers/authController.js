const User = require("../models/user");

exports.login = (req, res, next) => {
  //   console.log(req.body);

  User.findById(req.body._id).then((user) => {
    if (user) {
      console.log("user here : ", user);
      req.session.save((err) => {
        if (err) {
          console.log("lỗi lưu session: ", err);
          return res.status(400).send(err);
        }

        req.session.user = user;
        req.isLogin = true;

        return res.status(200).send(true);
      });
    } else {
      return res.status(400).send("login thất bại");
    }
  });
};
