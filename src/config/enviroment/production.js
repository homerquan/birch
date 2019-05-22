
// Production specific configuration
// =================================
module.exports = {
  logLvl: 'error',
  // Server port
  port: process.env.PORT || 8080,
  // Server IP
  ip: process.env.IP || '0.0.0.0',
  // API URL to be used in the client-side code
  clientUrl: process.env.API_CLIENT_URL || 'https://console-api.rl.business/graphql',
  // API URL to be used in the server-side code
  serverUrl: process.env.API_SERVER_URL || 'https://console-api.rl.business/graphql',
  clientSubscriptionUrl:
    process.env.API_SUBSCRIPTION_URL ||
    'wss://console-api.rl.business/graphql-subscriptions',
  widgetUrl: 'https://widget.rl.business/index.js',

  // API URL for graphql subscription ws
  clientSubscriptionUrl: process.env.API_SUBSCRIPTION_URL || 'wss://console-api.rl.business',
};
