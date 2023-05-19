var express = require("express");
var router = express.Router();
const { expressjwt: jwt } = require("express-jwt");
const lyb_controller = require("../controllers/lybController");
require("dotenv").config();
const secretKey = process.env.MIMA;
/* 用户列表 */
router.get(
  "/test",
  //   jwt({ secret: secretKey, algorithms: ["HS256"] }),
  lyb_controller.test
);

//删除用户
module.exports = router;
