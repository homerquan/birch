// shared configurations for all env
const path = require('path');
module.exports = {
  env: process.env.NODE_ENV,
	// Root path of server
  root: path.normalize(`${__dirname}/../../..`),
  analytics: {
   googleTrackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },
	verificationExpire: '24h',
  verificationTokenSize: 64,
  loginTokenExpireIn: '24h',
};
