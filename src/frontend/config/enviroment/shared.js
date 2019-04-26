'use strict';

//shared setting for FE and BE
module.exports = {
	appName: 'reflen-console',
	tokenName: 'reflen-token',
	sessionCookieName: 'convopsot-session-cookie',
	runtimeCookieName: 'convopsot-runtime-cookie',
	refreshTokenName: 'reflen-refresh-token',
	pollInterval: 3000,
	userRoles: ['guest', 'user', 'admin'],
	clientUrl: 'http://localhost:8003',
	clientSubscriptionUrl: 'ws://localhost:8003',
	widgetUrl: 'http://localhost:8005/reflen.js',
	apiPrefix: '/api',
	allowDevDebug: true  //allow simulate events in dev console
};