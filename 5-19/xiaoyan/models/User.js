const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  sex: { type: String, required: true, max: 100 },
  username: { type: String, required: true },
  password: { type: String, required: true, max: 100 },
  create_time: { type: Date },
});
// 导出 User 模型
module.exports = mongoose.model("User", UserSchema);
