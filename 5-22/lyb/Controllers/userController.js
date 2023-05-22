const User = require("../models/User");
const md5 = require("md5");
const captcha = require("svg-captcha");
const jwt = require("jsonwebtoken");
const secretKey = "lyb-code";

exports.userInfo = (req, res, next) => {
  const token = req.get("Authorization").substring(7);
  try {
    return jwt.verify(token, secretKey).user;
  } catch (err) {
    res.json({ status: -1, msg: "验证失败" + err.message });
  }
};
exports.user_add = (req, res, next) => {
  const UserModel = new User({
    username: req.body.username,
    password: md5(req.body.password),
    sex: req.body.sex,
    nickname: req.body.nickname,
  });
  UserModel.save()
    .then((data) => {
      res.json({ status: 200, msg: "用户注册成功" });
    })
    .catch((err) => {
      if (err.code === 11000) {
        res.json({ status: -1, msg: "用户注册失败,用户已存在" });
      } else {
        res.json({ status: -1, msg: "用户注册失败" + err.message });
      }
    });
};
exports.get_code = (req, res, next) => {
  let result = captcha.create();
  req.session = {
    code: result.text,
  };
  res.type("svg");

  res.status(200).send(result.data);
};
//登录
exports.login = (req, res, next) => {
  let ucode = req.body.captcha; //用户输入的验证码
  //比对用户信息
  User.findOne({
    username: req.body.username,
    password: md5(req.body.password),
  }).then((data) => {
    if (data) {
      const token = jwt.sign({ user: data }, secretKey, {
        expiresIn: "1 days",
      });
      res.json({ status: 200, msg: "登录成功", token: token });
    } else {
      res.json({ status: 201, msg: "登录失败" });
    }
  });
};
