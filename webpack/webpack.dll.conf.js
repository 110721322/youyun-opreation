const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { library } = require('./dll.config')
const productionGzipExtensions = ['js', 'css']

// dll文件存放的目录
const dllPath = '../public/vendor'

module.exports = {
  entry: {
    // 需要提取的库文件
    ...library
  },
  output: {
    path: path.join(__dirname, dllPath),
    filename: '[name]/[name].dll.js',  // vendor.dll.js中暴露出的全局变量名
    library: '[name]_[hash]'  // 保持与 webpack.DllPlugin 中名称一致
  },
  plugins: [
    // 清除之前的dll文件
    new CleanWebpackPlugin(),

    // 下面是下载的插件的配置
    new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
      threshold: 10240,
      minRatio: 0.8
    }),
    // manifest.json 描述动态链接库包含了哪些内容
    new webpack.DllPlugin({
      path: path.join(__dirname, dllPath, '[name]/[name]-manifest.json'),
      // 保持与 output.library 中名称一致
      name: '[name]_[hash]',
      context: process.cwd()
    })
  ]
}
