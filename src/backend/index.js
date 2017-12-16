// register app with backend
import expressGraphQL from "express-graphql";
import { PubSub } from "graphql-subscriptions";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import schema from '../gql/schema';
import config from "./config";

const backend = (app, server) => {

	// socketio server
	const socketio = require('socket.io')(server, {
	    serveClient: config.env !== 'production',
	    path: '/socket.io-client'
	  });
	
	//
	// Register API middleware
	// -----------------------------------------------------------------------------
	const graphqlMiddleware = expressGraphQL(req => ({
		schema,
		graphiql: __DEV__,
		rootValue: { request: req },
		pretty: __DEV__
	}));

	app.use("/graphql", graphqlMiddleware);

	const subscriptionServer = SubscriptionServer.create(
		{
			schema,
			execute,
			subscribe
		},
		{
			server: server,
			path: "/graphql"
		}
	);
};

export default backend;
