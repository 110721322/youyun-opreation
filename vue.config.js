const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const path = require('path')

const resolve = (dir) => {
  return path.join(__dirname, dir)
}

const Timestamp = new Date().getTime(); // 当前时间为了防止打包缓存不刷新，所以给每个js文件都加一个时间戳

module.exports = {
  // publicPath: process.env.NODE_ENV === 'development' ? '' : '././',
  pwa: {
    iconPaths: {
      favicon32: '@/assets/img/ome_image.png',
      favicon16: '@/assets/img/ome_image.png',
      appleTouchIcon: '@/assets/img/ome_image.png',
      maskIcon: '@/assets/img/ome_image.png',
      msTileImage: '@/assets/img/ome_image.png'
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    devServer: {
      port: 8080,
      proxy: {
        '/operation': {
          target: process.env.VUE_APP_BASEURL,
          changeOrigin: true
        },
        '/common': {
          target: process.env.VUE_APP_COMMONURL,
          changeOrigin: true
        },
        '/agent': {
          target: process.env.VUE_APP_AGENTURL,
          changeOrigin: true
        },
        '/merchant': {
          target: process.env.VUE_APP_MERCHANTURL,
          changeOrigin: true
        }
      }
    },
    plugins: [
      // 下面是下载的插件的配置
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
    ],
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

