const path = require("path"); //导入node.js 中专门操作路径的模块
//1.导入HTML插件，得到一个构造函数
const HtmlPlugin = require("html-webpack-plugin");

//2.创建HTML 插件的实例对象
const htmlPlugin = new HtmlPlugin({
  template: "./src/index.html", //指定原文件的存放路径
  filename: "./index.html", //指定生成文件的存放路径
});
module.exports = {
  mode: "development", // mode用来指定结构模式，可选值有development 和 production
  entry: path.join(__dirname, "./src/index.js"), //打包入口文件路径
  output: {
    path: path.join(__dirname, "./dist"), //输出文件存放路径
    filename: "bundle.js", //输出文件的名称
  },
  plugins: [htmlPlugin], //3.通过plugins节点，使htmlPlugin插件生效
  devServer: {
    open: true, //初次打包完成后，自动打开浏览器
    host: "127.0.0.1", //实是打包所使用的主机地址
    port: 80, //实时打包使用的端口号 (在http协议中，端口是80则可以省略不显示)
  },
};
