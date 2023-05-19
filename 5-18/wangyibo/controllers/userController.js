const User = require("../models/User");

// 显示完整的用户列表
exports.user_list = (req, res) => {
  User.find({})
    .then(function (docs) {
      // 处理结果
      res.json(list_users);
    })
    .catch(function (err) {
      // 处理错误
      res.json(err);
    });
};
//增加用户
exports.user_add = (req, res) => {
  const newUser = new User({
    name: "zs",
    age: 30,
    username: "zhangsan",
    password: "123456",
  });

  newUser
    .save()
    .then((user) => {
      console.log(user);
    })
    .catch((error) => {
      console.error(error);
    });
};
