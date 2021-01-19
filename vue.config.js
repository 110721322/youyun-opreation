const webpack = require('webpack')
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const { library } = require('./webpack/dll.config')
const dllPath = './public/vendor'
const productionGzipExtensions = ['js', 'css']
const serves = ['production', 'test']
const devtool = process.env.NODE_ENV === 'production' ? 'none' : 'eval-source-map'
const packageInfo = require('./package.json')

const resolve = (dir) => {
  return path.join(__dirname, dir)
}

const Timestamp = new Date().getTime(); // 当前时间为了防止打包缓存不刷新，所以给每个js文件都加一个时间戳


// 生产环境插件
const NODE_PROD_PLUGINS = [
  // 下面是下载的插件的配置
  new CompressionWebpackPlugin({
    algorithm: 'gzip',
    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
    threshold: 10240,
    minRatio: 0.8
  }),
  // 加载通过dll预先打包的模块,告知webpack不对这些模块进行打包
  ...Object.keys(library).map(name => {
    return new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: path.join(dllPath, `${name}/${name}-manifest.json`)
    });
  }),
  // 在html中插入引入dll分包
  ...Object.keys(library).map(name => {
    return new AddAssetHtmlPlugin({
      outputPath: `/vendor/${name}`,
      publicPath: `/vendor/${name}`,
      filepath: path.resolve(__dirname, `${dllPath}/${name}/${name}.${packageInfo.dllVersion}.dll.js`)
    });
  })
];

// 开发环境插件
const NODE_DEV_PLUGINS = [
  // 下面是下载的插件的配置
  new CompressionWebpackPlugin({
    algorithm: 'gzip',
    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
    threshold: 10240,
    minRatio: 0.8
  })
]

const plugins = process.env.NODE_ENV === 'production' ? NODE_PROD_PLUGINS : NODE_DEV_PLUGINS


if (serves.indexOf(process.env.SERVE_ENV) !== -1) {
  plugins.unshift(
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      cdnConfig: 'https://aduerstatic.oss-cn-hangzhou.aliyuncs.com/monitor/operation_provider.js'
    })
  )
} else {
  plugins.unshift(
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    })
  )
}

module.exports = {
  // publicPath: process.env.NODE_ENV === 'development' ? '' : '././',
  transpileDependencies: ['element-ui'],
  configureWebpack: {
    entry: {
      app: ["babel-polyfill", resolve('./src/main.js')]
    },
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `[name].${packageInfo.version}.${Timestamp}.js`,
      chunkFilename: `[name].${packageInfo.version}.${Timestamp}.js`
    },
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    devServer: {
      port: 8082,
      proxy: {
        '/common': {
          target: process.env.COMMON_URL,
          changeOrigin: true
        },
        '/operation': {
          target: process.env.OPERATION_URL,
          changeOrigin: true
        },
        '/agent': {
          target: process.env.AGENT_URL,
          changeOrigin: true
        }
      }
    },
    devtool: devtool,
    plugins: plugins
  },
  chainWebpack: config => {
    config.plugin('provide').use(webpack.ProvidePlugin, [{
      jquery: 'jquery'
    }]);
    config.plugin('prefetch').tap(options => {
      options[0].fileBlacklist = options[0].fileBlacklist || []
      options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
      return options
    })
  }
};

