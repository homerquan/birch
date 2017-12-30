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
	apiUrl: 'http://api.stage.reflen.com',
	apiPrefix: '/api'
};