/*
 * @Author: Homer
 * @Date:   2017-12-29 17:47:30
 * @Last Modified by:   Homer
 * @Last Modified time: 2017-12-29 22:01:47
 */
'use strict';

// Development specific configuration
// ==================================
module.exports = {

	logLvl: 'debug',

	hashSalt: 'ilikeconvospot',

	amqpConn: 'amqp://guest:guest@localhost:5672/seneca',

	// Server port
	port: process.env.PORT || 8102,

	// Server IP
	ip: process.env.IP || '0.0.0.0',

	// API URL to be used in the client-side code
	clientUrl: process.env.API_CLIENT_URL || `http://api.stage.reflen.com`,
	// API URL to be used in the server-side code
	serverUrl: process.env.API_SERVER_URL || `http://api.stage.reflen.com}`,
	// API URL for graphql subscription ws
	clientSubscriptionUrl: process.env.API_SUBSCRIPTION_URL || `ws://api.stage.reflen.com`

};