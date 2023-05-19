const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  age: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true, max: 100 },
});
// 导出 User 模型
module.exports = mongoose.model("User", UserSchema);
