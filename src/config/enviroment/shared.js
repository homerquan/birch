'use strict';

//shared setting for FE and BE
module.exports = {
	appName: 'convospot-console',
	tokenName: 'convospot-token',
	sessionCookieName: 'convopsot-session-cookie',
	runtimeCookieName: 'convopsot-runtime-cookie',
	refreshTokenName: 'convospot-refresh-token',
	userRoles: ['guest', 'user', 'admin'],
	apiUrl: 'http://localhost:3003',
	apiPrefix: '/api'
};