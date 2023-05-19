const User = require("../models/User");
const md5 = require("md5");
exports.user_list = (req, res, next) => {
  User.find({ name: "zs" })
    .then(() => {
      res.json(list_users);
    })
    .catch((err) => {
      res.json(err);
    });
};
exports.user_add = (req, res, next) => {
  //先去数据库中查找是否有相同的用户名
  User.findOne({ username: req.body.username }).then((user) => {
    if (user) {
      res.json({ msg: "用户名已存在" });
    } else {
      let newUser = new User({
        sex: req.body.sex,
        username: req.body.username,
        password: md5(md5(req.body.password)),
        create_time: getNowTime(),
      });
      newUser
        .save()
        .then((user) => {
          res.json(user);
        })
        .catch((error) => {
          res.json(error);
        });
    }
  });
};

const getNowTime = () => {
  let date = new Date(+new Date() + 8 * 3600 * 1000);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
};
