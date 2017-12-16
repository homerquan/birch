// register app with backend
import expressGraphQL from "express-graphql";
import { PubSub } from "graphql-subscriptions";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";

const backend = (app, server) => {
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
