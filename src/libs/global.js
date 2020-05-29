import utils from '@/libs/kit/utils.js';

import devConfig from './config/devConfig';
import testConfig from './config/testConfig';
import prodConfig from './config/prodConfig';
import selectData from './data/selectData';
// import menuModel from './data/menuListModel';

window.trace = utils.trace;

function getConfig () {
  let config;
  console.log('dev', process.env.NODE_ENV);

  if (process.env.VUE_APP_ENV_CONFIG === 'dev') {
    config = devConfig;
  } else if (process.env.VUE_APP_ENV_CONFIG === 'test') {
    config = testConfig;
  } else if (process.env.VUE_APP_ENV_CONFIG === 'prod') {
    config = prodConfig;
  } else {
    config = devConfig;
  }
  return config;
}

const config = getConfig();

export {
  utils,
  // fun,
  config,
  selectData
  // menuModel,
};
