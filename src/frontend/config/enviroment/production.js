'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP ||
    process.env.IP ||
    undefined,

  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT ||
    process.env.PORT ||
    8080,

  logLvl: 'error',

  hashSalt: '4+GuD3~F9&Lt}S=.',

  coresWhitelist: ['http://app.convospot.io', 'http://widget.convospot.io'],

  postmarkToken: 'eae44408-39d1-44aa-a31b-59eb15d7da3e'
};