var express = require("express");
var router = express.Router();
const user_controller = require("../controllers/userController");
const login_controller = require("../controllers/loginController");
/* 用户列表 */
router.get("/", user_controller.user_list);

//添加用户
router.post("/", user_controller.user_add);
//删除用户
module.exports = router;
