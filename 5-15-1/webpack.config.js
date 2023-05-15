const path = require("path"); //导入node.js 中专门操作路径的模块
//1.导入HTML插件，得到一个构造函数
const HtmlPlugin = require("html-webpack-plugin");

//2.创建HTML 插件的实例对象
const htmlPlugin = new HtmlPlugin({
  template: "./src/index.html", //指定原文件的存放路径
  filename: "./index.html", //指定生成文件的存放路径
});
//自动清除dist目录
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const cleanPlugin = new CleanWebpackPlugin();
module.exports = {
  mode: "development",
  devtool: "eval-source-map", //开发环境下使用
  entry: path.join(__dirname, "./src/index.js"), //打包入口文件路径
  resolve: {
    alias: {
      "@": path.join(__dirname, "./src"),
    },
  },
  output: {
    path: path.join(__dirname, "./dist"), //输出文件存放路径
    filename: "app.js", //输出文件的名称
  },
  plugins: [htmlPlugin, cleanPlugin], //3.通过plugins节点，使htmlPlugin插件生效
  module: {
    //所有第三方模块匹配规则
    rules: [
      //文件后缀名的匹配规则
      {
        test: /\.(htm|html)$/i,
        use: {
          loader: "html-loader",
        },
      },
      { test: /\.css/, use: ["style-loader", "css-loader"] },
      { test: /\.scss/, use: ["style-loader", "css-loader", "sass-loader"] },
      { test: /\.js$/, use: "babel-loader", exclude: /node_modules/ },
      {
        /*
         *	yarn add url-loader file-loader -D
         *	loader说明：
         *	只配置url-loader，file-loader不用配置，条件满足后url-loader会自动调用file-loader执行
         *	 webpack要将图片进行打包，需要安装儒url-loader加载器，加载器有个默认的设置选项limit：8196，当你的图片大小不超过8kb的时候，打包的时候会生成base64位的图片地址
         */
        // 图片处理loader配置
        test: /\.(png|jpg|gif)$/, // 正则匹配图片
        use: [
          {
            loader: "url-loader",
            options: {
              // limit:设定大小阀值
              // a. 被处理图片大小 大于该阀值，就通过物理文件重新生成该图片
              // b. 被处理图片大小 小于等于该阀值，就把图片变为字符串(嵌入到应用文档中，好处是节省一个http资 源)
              limit: 8196,
              // 做配置，使得生成的物理图片被存储在dist/image里边
              outputPath: "./image",
              //通过在url-loader的options中增加esModule:false
              esModule: false,
            },
          },
        ],
        type: "javascript/auto",
      },
    ],
  },
  devServer: {
    static: {
      // 该配置 可以设置如果项目中找不到的资源， 可以在当前目录下的文件夹另外加载
      directory: path.join(__dirname, "./src/index.js"),
      // 实现监听
      watch: true,
    },
    compress: true,
    open: true, //初次打包完成后，自动打开浏览器
    host: "127.0.0.1", //实是打包所使用的主机地址
    port: 3000, //实时打包使用的端口号 (在http协议中，端口是80则可以省略不显示)
    hot: true,
  },
};
