const Lyb = require("../models/Lyb");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.MIMA;
exports.test = (req, res, next) => {
  // let  token = req.headers.authorization;
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDY2ZjNiZmY3MjVhZTk3ZGY3YWUyNGEiLCJuYW1lIjoi5Yaw6Zuq5YKy5qKFIiwiYWdlIjoxOCwidXNlcm5hbWUiOiJhb21laSIsInBhc3N3b3JkIjoiMTRlMWI2MDBiMWZkNTc5ZjQ3NDMzYjg4ZThkODUyOTEiLCJjcmVhdGVfdGltZSI6IjIwMjMtMDUtMTlUMTE6NTc6NTEuMDAwWiIsIl9fdiI6MCwiaWF0IjoxNjg0NDc5MDA5LCJleHAiOjE2ODQ0ODI2MDl9.Nfj8-FkUGxuZPSZxeQES_9OUi5wtJFg1-7R3NREXVzo";

  // 验证JWT令牌并解析用户信息
  try {
    const users = jwt.verify(token, secretKey);
    console.log(users);
    let lyb = new Lyb({
      name: users.username,
      title: req.body.title,
      content: req.body.content,
    });
    lyb.save().then(() => {});
    res.json(users);
  } catch (err) {
    console.error(`验证JWT令牌失败：${err.message}`);
  }
};
