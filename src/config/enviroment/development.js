"use strict";

// Development specific configuration
// ==================================
module.exports = {
	logLvl: "debug",

	hashSalt: "ilikereflen",

	amqpConn: "amqp://guest:guest@localhost:5672/seneca",

	// Server port
	port: process.env.PORT || 8002,

	// Server IP
	ip: process.env.IP || "0.0.0.0",

	// API Gateway

	// API URL to be used in the client-side code
	clientUrl:
		process.env.API_CLIENT_URL ||
		`http://localhost:${process.env.PORT || 8003}`,
	// API URL for graphql subscription ws
	clientSubscriptionUrl:
		process.env.API_SUBSCRIPTION_URL ||
		`ws://localhost:${process.env.PORT || 8003}`,

	widgetUrl: "http://localhost:8005/index.js",

	// API URL to be used in the server-side code
	serverUrl:
		process.env.API_SERVER_URL ||
		`http://localhost:${process.env.PORT || 8003}`,

};
