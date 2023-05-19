const express = require("express");
const router = express.Router();
const login_controller = require("../controllers/loginController");
/* 用户登录 */
router.post("/", login_controller.login);
module.exports = router;
