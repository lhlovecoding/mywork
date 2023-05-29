const User = require("../models/user");
exports.login = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user == null) {
        const userModel = new User({ username: req.body.username });
        userModel.save().then((user) => {
          req.session.username = user.username;
          req.session.save();
          res.json(user);
        });
      } else {
        req.session.username = user.username;
        console.log(req.session);
        req.session.save();
        res.json(user);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
