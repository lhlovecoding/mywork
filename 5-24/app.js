const express = require("express");
const session = require("express-session");
const { createServer } = require("http");
const MongoStore = require("connect-mongo")(session);
const { Server } = require("socket.io");
var path = require("path");
const { log } = require("console");
const app = express();
const sessionConfig = {
  secret: "your secret key",
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: "mongodb://localhost:27017/session-store",
    collection: "sessions",
  }),
  cookie: { maxAge: 1000 * 60 * 60 },
};
app.use(session(sessionConfig));

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Content-Type,Authorization,token"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // res.header("Content-Type", "*");
  next();
});

app.get("/index", (req, res, next) => {
  req.session.user = { username: "lyb" };
  log(req.session);
  res.sendFile(path.resolve(__dirname, "index.html"));
});
app.get("/", (req, res, next) => {
  req.session.user = { username: "lyb" };
  res.json(req.session.user);
});
app.get("/user", (req, res, next) => {
  console.log(req.session.user, 999999);
  res.json({ code: 200, msg: "ok77777", user: req.session.user });
});
app.get("/score", (req, res, next) => {
  let data = {
    username: "张三",
    age: 18,
    socre: [
      {
        name: "语文",
        score: 100,
      },
      {
        name: "数学",
        score: 100,
      },
    ],
  };
  res.json({ code: 200, msg: "ok77777", data: data });
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
  cors: {
    origin: "http://127.0.0.1:5500",
    credentials: true,
  },
});
const wrap = (middleware) => (socket, next) => {
  middleware(socket.request, {}, next);
};
io.use(wrap(session(sessionConfig)));
io.on("connection", (socket) => {
  // ...
  console.log("连接成功");
  socket.on("message", (msg) => {
    log(msg);
    log(socket.request.session, "session");
  });
});
httpServer.listen(3000);
