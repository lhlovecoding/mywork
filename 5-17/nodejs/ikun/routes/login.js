var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
// 定义密钥
const secretKey = "ikuns";
// 定义用户信息
const users = [
  { id: 1, username: "user1", password: "123456" },
  { id: 2, username: "user2", password: "password2" },
];

// 登录接口
router.post("/", (req, res) => {
  // 模拟数据库查询
  const user = users.find(
    (user) =>
      user.username === req.body.username && user.password === req.body.password
  );
  console.log(user);
  if (!user) {
    return res
      .status(401)
      .json({ message: "登录失败，请检查用户名和密码是否正确" });
  }

  // 生成JWT令牌
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });

  // 返回JWT令牌
  res.json({ token });
});

module.exports = router;
