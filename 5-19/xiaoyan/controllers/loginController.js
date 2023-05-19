const User = require("../models/User");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.MIMA;
//用户登录的方法
exports.login = (req, res, next) => {
  User.findOne({
    username: req.body.username,
    password: md5(md5(req.body.password)),
  }).then((users) => {
    // 生成token
    users = JSON.parse(JSON.stringify(users));
    const token = jwt.sign(users, secretKey, {
      expiresIn: "1h",
    });
    res.json({ token });
  });
};
