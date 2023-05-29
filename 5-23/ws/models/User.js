const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
});
module.exports = mongoose.model("User", UserSchema);
// 导出 User 模型
