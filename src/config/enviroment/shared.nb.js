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
	clientUrl: '__clientUrl',
	clientSubscriptionUrl: '__clientSubscriptionUrl',
	widgetUrl: '__widgetUrl',
	apiPrefix: '/api',
	allowDevDebug: true  //allow simulate events in dev console
};