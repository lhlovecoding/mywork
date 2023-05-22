var express = require("express");
var router = express.Router();
const user_controller = require("../controllers/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
//注册用户
router.post("/", user_controller.user_add);
//验证码
router.get("/code", user_controller.get_code);
//登录
router.post("/login", user_controller.login);
module.exports = router;
