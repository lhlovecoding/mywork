import { log } from "console";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import querystring from "querystring";
import util from "util";
const users = [];
let index = -1;
const httpServer = createServer(function (req, res) {
  res.writeHead(200, {
    "Content-Type": "text/plain; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  });
  // 定义了一个post变量，用于暂存请求体的信息
  var post = "";
  // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
  req.on("data", function (chunk) {
    post += chunk;
  });
  // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
  req.on("end", function () {
    post = querystring.parse(post);
    if (post.username) {
      index = users.findIndex((item) => item.username === post.username);
      if (index === -1) {
        users.push({
          username: post.username,
          uuid: uuidv4(),
        });
        index = users.length - 1;
      }

      res.end(JSON.stringify(users[index]));
    }
  });
});
const io = new Server(httpServer, {
  //跨域
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  io.emit("message", users);
  // 加入房间
  socket.join(users[index].uuid);
  // 监听消息事件
  socket.on("message", (msg) => {
    console.log(msg);
    // 向房间中的所有连接发送消息
    io.to("roomA").emit("message", msg);
  });

  // 离开房间
  socket.on("disconnect", () => {
    socket.leave("roomA");
  });
});
httpServer.listen(3001);
