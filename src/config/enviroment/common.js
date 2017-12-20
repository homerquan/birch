// shared configurations for all env
const path = require('path');

module.exports = {

  env: process.env.NODE_ENV,

	// Root path of server
  root: path.normalize(`${__dirname}/../../..`),

	// Server port
  port: process.env.PORT || 3000,

	// Server IP
  ip: process.env.IP || '0.0.0.0',

  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || `http://localhost:${process.env.PORT || 3003}`,
    // API URL to be used in the server-side code
    serverUrl: process.env.API_SERVER_URL || `http://localhost:${process.env.PORT || 3003}`,
  },

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: process.env.JWT_SECRETS || '08f1af67cddd127b6f2122ce7a05cf5ef171c199a350687d3c8d8ed62b03642c',
  },

  analytics: {
   googleTrackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },

	verificationExpire: '24h',
  verificationTokenSize: 64,

  // set open access endpoints (no need token, but limit rates)
  publicEndpoints: {
    GET: [
      '^/suggestion$',
      '^/file/',
    ],
    POST: [{
      path: '^/user/status$',
      query: {
        action: 'login',
      },
    }, {
      path: '^/user/status$',
      query: {
        action: 'refresh',
      },
    }, {
      path: '^/user/status$',
      query: {
        action: 'reset_password',
      },
    }, {
      path: '^/user/status$',
      query: {
        action: 'check_vtoken',
      },
    }, {
      path: '^/user/status$',
      query: {
        action: 'update_password',
      },
    },
      '^/user$',
      '^/test$',
    ],
    PATCH: [],
    PUT: [],
    DELETE: [],
  },

  loginTokenExpireIn: '24h',
};
