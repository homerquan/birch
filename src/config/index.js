/* eslint-disable max-len */

let config = {};
if (process.env.BROWSER) {
  // for client side code, only load shared config
  config = require('./enviroment/shared');
} else {
  const envConfig = require('./enviroment');
  // Using RC to read settings in /etc/appnamerc
  config = require('rc')(process.env.npm_package_name || 'convospot-console', envConfig);
}

export default config;
