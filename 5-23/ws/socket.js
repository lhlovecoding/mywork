var io = require("socket.io")();

var session = require("express-session");
const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);
io.use(
  wrap(
    session({
      secret: "chats",
      resave: false,
      saveUninitalized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  )
);

const users = [];

exports.listen = function (_server) {
  io.listen(_server, {
    cors: {
      origin: "http://127.0.0.1:3000",
      credentials: true,
    },
  });
  io.sockets.on("connection", function (socket) {
    console.log("连接成功");
    //打印seesionid
    console.log(socket.request.sessionID);
    if (!socket.request.session) {
      socket.emit("message", { code: 401, msg: "请先登录" });
    } else {
      console.log(socket.request.session);
      socket.emit("userlist", users);
    }
  });
};
