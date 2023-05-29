var express = require("express");
var router = express.Router();
var user_controller = require("../Controllers/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.post("/login", user_controller.login);

module.exports = router;
