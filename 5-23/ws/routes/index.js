var express = require("express");
var router = express.Router();
var path = require("path");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.sendFile(path.resolve(__dirname, "../chat.html"));
});
router.get("/chat", function (req, res, next) {
  res.sendFile(path.resolve(__dirname, "../chat.html"));
});
router.get("/login", function (req, res, next) {
  res.sendFile(path.resolve(__dirname, "../login.html"));
});
module.exports = router;
