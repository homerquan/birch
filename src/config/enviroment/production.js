'use strict';

// Production specific configuration
// =================================
module.exports = {
  logLvl: 'error',

  hashSalt: 'ilikeconvospot',

  amqpConn: 'amqp://guest:guest@localhost:5672/seneca',

  // Server port
  port: process.env.PORT || 8080,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // API URL to be used in the client-side code
  clientUrl: process.env.API_CLIENT_URL || `https://console-api.reflen.com`,
  // API URL to be used in the server-side code
  serverUrl: process.env.API_SERVER_URL || `https://console-api.reflen.com}`,

  widgetUrl: 'https://widget.reflen.com/convospot.js',
  
  // API URL for graphql subscription ws
  clientSubscriptionUrl: process.env.API_SUBSCRIPTION_URL || `wss://console-api.reflen.com`
};