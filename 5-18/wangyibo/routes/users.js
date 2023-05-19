var express = require("express");
var router = express.Router();

// 导入控制器模块
const user_controller = require("../controllers/userController");

//用户列表
router.get("/", user_controller.user_list);
router.get("/add", user_controller.user_add);
// const fs = require("fs");
// const { expressjwt: jwt } = require("express-jwt");
// const jsonwebtoken = require("jsonwebtoken");
// const { token } = require("morgan");
// require("dotenv").config();
// const secretKey = process.env.SECRETKEY;
// /* GET users listing. */

// router.get(
//   "/",
//   jwt({ secret: secretKey, algorithms: ["HS256"] }),
//   function (req, res, next) {
//     let token = req.headers.authorization.substring(7);
//     const decoded = jsonwebtoken.verify(token, secretKey);
//     // const userId = decoded.userId;
//     fs.readFile("./data/users.json", (err, data) => {
//       let users = JSON.parse(data);
//       let result = {
//         code: 200,
//         msg: "success",
//         data: users.list,
//       };
//       res.send(JSON.stringify(result));
//     });
//   }
// );
// // 添加用户
// router.post(
//   "/add",
//   jwt({ secret: secretKey, algorithms: ["HS256"] }),
//   function (req, res, next) {
//     fs.readFile("./data/users.json", (err, data) => {
//       let users = JSON.parse(data);
//       let newUser = {
//         id: ++users.auto_id,
//         name: req.body.name,
//         age: +req.body.age,
//       };
//       users.list.unshift(newUser);
//       fs.writeFile("./data/users.json", JSON.stringify(users), (err) => {
//         if (err) {
//           let err = {
//             code: -1,
//             msg: "添加失败",
//             err: err,
//           };
//           res.send(JSON.stringify(err));
//         } else {
//           let result = {
//             code: 200,
//             msg: "添加成功",
//             data: newUser,
//           };
//           res.send(JSON.stringify(result));
//         }
//       });
//     });
//   }
// );
// //通过ID查询用户
// router.get(
//   "/info",
//   jwt({ secret: secretKey, algorithms: ["HS256"] }),
//   function (req, res, next) {
//     console.log(req.query.id);
//     fs.readFile("./data/users.json", (err, data) => {
//       let users = JSON.parse(data);
//       let result = users.list.findIndex((item, index) => {
//         return item.id == req.query.id;
//       });
//       if (result == -1) {
//         res.send(JSON.stringify({ code: 404, msg: "用户不存在" }));
//       } else {
//         res.send({ code: 200, msg: "success", data: users.list[result] });
//       }
//     });
//   }
// );
// //通过ID删除用户
// router.delete(
//   "/del",
//   jwt({ secret: secretKey, algorithms: ["HS256"] }),
//   function (req, res, next) {
//     console.log(req.query.id);
//     fs.readFile("./data/users.json", (err, data) => {
//       let users = JSON.parse(data);
//       let index = users.list.findIndex((item, index) => {
//         return item.id == req.query.id;
//       });
//       if (index == -1) {
//         res.send(JSON.stringify({ code: 404, msg: "用户不存在" }));
//         return;
//       }
//       users.list.splice(index, 1);
//       fs.writeFile("./data/users.json", JSON.stringify(users), (err) => {
//         if (err) {
//           res.send(JSON.stringify({ code: 404, msg: "删除失败" }));
//         } else {
//           res.send({ code: 200, msg: "success" });
//         }
//       });
//     });
//   }
// );
// //通过ID修改用户
// router.put(
//   "/save",
//   jwt({ secret: secretKey, algorithms: ["HS256"] }),
//   function (req, res, next) {
//     fs.readFile("./data/users.json", (err, data) => {
//       let users = JSON.parse(data);
//       let index = users.list.findIndex((item, index) => {
//         return item.id == req.query.id;
//       });
//       if (index == -1) {
//         res.send(JSON.stringify({ code: 404, msg: "用户不存在" }));
//         return;
//       }
//       users.list[index] = {
//         id: req.query.id,
//         name: req.body.name,
//         age: req.body.age,
//       };
//       fs.writeFile("./data/users.json", JSON.stringify(users), (err) => {
//         if (err) {
//           let err = {
//             code: -1,
//             msg: "更新失败",
//             err: err,
//           };
//           res.send(JSON.stringify(err));
//         } else {
//           let result = {
//             code: 200,
//             msg: "更新成功",
//             data: users.list[index],
//           };
//           res.send(JSON.stringify(result));
//         }
//       });
//     });
//   }
// );
module.exports = router;
