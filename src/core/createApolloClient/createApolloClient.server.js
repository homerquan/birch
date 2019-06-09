import {
    SubscriptionClient,
    addGraphQLSubscriptions,
} from 'subscriptions-transport-ws';
import ws from 'ws';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import config from '../../config';


const networkInterface = createNetworkInterface({
  uri: config.clientUrl, // Your GraphQL endpoint
});

// Create WebSocket client
const wsClient = new SubscriptionClient(
  config.clientSubscriptionUrl,
  {
    reconnect: true,
    connectionParams: {},
  },
  ws,
);

// Extend the network interface with the WebSocket
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient,
);

const client = new ApolloClient({
  reduxRootSelector: state => state.apollo,
  queryDeduplication: true,
  networkInterface: networkInterfaceWithSubscriptions,
});

export default function createApolloClient() {
  return client;
}
