var express = require("express");
var router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRETKEY;

/* GET home page. */
router.post("/", function (req, res, next) {
  console.log(req.body);
  fs.readFile("./data/users.json", (err, data) => {
    let users = JSON.parse(data);
    console.log(users.list);
    let index = users.list.findIndex((item, index) => {
      return (
        item.username == req.body.username && item.password == req.body.password
      );
    });
    if (index > -1) {
      //说明用户存在且输出正确
      const token = jwt.sign(users.list[index], secretKey, {
        expiresIn: "1h",
      });
      res.json({ token });
    } else {
      //用户或密码错误
      res.json({ code: 401, msg: "用户或密码错误" });
    }
  });
});

module.exports = router;
