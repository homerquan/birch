import {SubscriptionClient, addGraphQLSubscriptions} from 'subscriptions-transport-ws';
import ApolloClient, {createNetworkInterface} from 'apollo-client';

const httpUri = 'http://localhost:3003/graphql'; 
const wsUri = 'ws://localhost:3003/graphql-subscriptions';

const networkInterface = createNetworkInterface({
 uri: httpUri // Your GraphQL endpoint
});

// Create WebSocket client
const wsClient = new SubscriptionClient(wsUri, {
    reconnect: true,
    connectionParams: {
        // Pass any arguments you want for initialization
    }
});

// Extend the network interface with the WebSocket
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient
);

const client = new ApolloClient({
	reduxRootSelector: state => state.apollo,
	queryDeduplication: true,
    networkInterface: networkInterfaceWithSubscriptions
});

export default function createApolloClient() {
  return client;
}
