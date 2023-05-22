const mongoose = require("mongoose");
const moment = require("moment");
moment.locale("zh-cn");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true },
  sex: { type: String, default: "未知" },
  create_time: {
    type: Date,
    default: Date.now,
    get: (v) => moment(v).format("YYYY-MM-DD HH:mm:ss"),
  },
});
UserSchema.set("toJSON", { getters: true });
module.exports = mongoose.model("User", UserSchema);
// 导出 User 模型
