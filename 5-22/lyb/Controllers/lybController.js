const Lyb = require("../models/Lyb");
const user_controller = require("../controllers/userController");
exports.lyb_add = (req, res, next) => {
  const userInfo = user_controller.userInfo(req, res, next);
  const LybModel = new Lyb({
    title: req.body.title,
    content: req.body.con,
    nickname: userInfo.nickname,
    user_id: userInfo._id,
  });
  LybModel.save()
    .then((data) => {
      res.json({ status: 200, msg: "发布成功" });
    })
    .catch((err) => {
      res.json({ status: -1, msg: "发布失败" + err.message });
    });
};
exports.lyb_list = (req, res, next) => {
  Lyb.find({ delete_time: null })
    .populate({ path: "user_id", select: "sex" })
    .then((data) => {
      res.json(data);
    });
};
exports.lyb_del = (req, res, next) => {
  const userInfo = user_controller.userInfo(req, res, next);
  Lyb.findOne({ _id: req.params.id }).then((data) => {
    if (data.user_id != userInfo._id) {
      res.json({ status: -1, msg: "不能删除别人的留言" });
    } else {
      Lyb.updateOne(
        { _id: req.params.id },
        { $set: { delete_time: new Date() } }
      )
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.json({ status: -1, msg: "删除失败" + err.message });
        });
    }
  });
};
