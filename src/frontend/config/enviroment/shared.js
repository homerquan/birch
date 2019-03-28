'use strict';

//shared setting for FE and BE
module.exports = {
	appName: 'convospot-console',
	tokenName: 'convospot-token',
	sessionCookieName: 'convopsot-session-cookie',
	runtimeCookieName: 'convopsot-runtime-cookie',
	refreshTokenName: 'convospot-refresh-token',
	pollInterval: 3000,
	userRoles: ['guest', 'user', 'admin'],
	clientUrl: 'http://localhost:8003',
	clientSubscriptionUrl: 'ws://localhost:8003',
	widgetUrl: 'http://localhost:8005/convospot.js',
	apiPrefix: '/api',
	allowDevDebug: true  //allow simulate events in dev console
};