const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LybSchema = new Schema({
  title: { type: String, required: true, max: 100 },
  content: { type: Number, required: true },
  liuyanren: { type: String, required: true },
});
// 导出 Lyb 模型
module.exports = mongoose.model("Lyb", LybSchema);
