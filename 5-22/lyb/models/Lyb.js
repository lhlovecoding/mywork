const mongoose = require("mongoose");
const moment = require("moment");
moment.locale("zh-cn");

const Schema = mongoose.Schema;

const LybSchema = new Schema({
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  nickname: { type: String, default: "未知" },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  create_time: {
    type: Date,
    default: Date.now,
    get: (v) => moment(v).format("YYYY-MM-DD HH:mm:ss"),
  },
  delete_time: {
    type: Date,
    default: null,
    get: (v) => moment(v).format("YYYY-MM-DD HH:mm:ss"),
  },
});
LybSchema.set("toJSON", { getters: true });
module.exports = mongoose.model("Lyb", LybSchema);
// 导出 Lyb 模型
