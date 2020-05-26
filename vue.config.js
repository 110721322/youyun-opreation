const webpack = require('webpack')

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '' : '././',
  chainWebpack: config => {
    config.plugin('provide').use(webpack.ProvidePlugin, [{
      jquery: 'jquery'
	    }]);
  }
};

