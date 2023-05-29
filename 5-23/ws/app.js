var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

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
var usersRouter = require("./routes/users");
var indexRouter = require("./routes/index");
var app = express();
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Content-Type,Authorization,token"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // res.header("Content-Type", "*");
  next();
});

// 设置 Mongoose 连接
const mongoose = require("mongoose");
const mongoDB = "mongodb://127.0.0.1:27017/chat"; //mongodb://127.0.0.1:27017/my123
mongoose.set("strictQuery", false);
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB 连接错误："));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "public")));

app.use(session(sessionConfig));
app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
