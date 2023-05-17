var express = require("express");
var router = express.Router();
const fs = require("fs");

router.get("/", function (req, res, next) {
  console.log(333);
  fs.readFile("./data/user.json", (err, data) => {
    data = JSON.parse(data);
    let result = {
      code: 200,
      msg: "success",
      data: data.datalist,
    };
    res.send(JSON.stringify(result));
  });
});
router.post("/add", function (req, res, next) {
  fs.readFile("./data/user.json", (err, user1) => {
    let user = JSON.parse(user1);
    let newUser = {
      id: ++user.auto_id,
      name: req.body.name,
      age: +req.body.age,
    };
    user.datalist.push(newUser);
    fs.writeFile("./data/user.json", JSON.stringify(user), (err) => {
      if (err) {
        console.log(err);
      }
      let result = {
        code: 200,
        msg: "success",
        data: newUser,
      };
      res.send(JSON.stringify(result));
    });
  });
});
module.exports = router;
