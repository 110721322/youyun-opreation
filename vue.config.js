const webpack = require('webpack')
const path = require('path')

const resolve = (dir) => {
  return path.join(__dirname, dir)
}

const Timestamp = new Date().getTime(); // 当前时间为了防止打包缓存不刷新，所以给每个js文件都加一个时间戳

module.exports = {
  // publicPath: process.env.NODE_ENV === 'development' ? '' : '././',
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`,
      chunkFilename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`
    }
  },
  chainWebpack: config => {
    config.plugin('provide').use(webpack.ProvidePlugin, [{
      jquery: 'jquery'
    }]);
  }
};

