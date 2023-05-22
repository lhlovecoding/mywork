var express = require("express");
var router = express.Router();
const lyb_controller = require("../controllers/lybController");
const { expressjwt: jwt } = require("express-jwt");
const secretKey = "lyb-code";
/*留言列表. */
router.get("/", lyb_controller.lyb_list);
//发布留言
router.post(
  "/add",
  jwt({ secret: secretKey, algorithms: ["HS256"] }),
  lyb_controller.lyb_add
);
//删除留言
router.delete(
  "/del/:id",
  jwt({ secret: secretKey, algorithms: ["HS256"] }),
  lyb_controller.lyb_del
);
module.exports = router;
