import {
    SubscriptionClient,
    addGraphQLSubscriptions
} from "subscriptions-transport-ws";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import config from '../../config';

const httpUri = config.clientUrl;
const wsUri = config.clientSubscriptionUrl;
const token = sessionStorage.getItem(config.tokenName) || '';


const networkInterface = createNetworkInterface({
    uri: httpUri // Your GraphQL endpoint
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    req.options.headers.authorization = token ? `Bearer ${token}` : null;
    next();
  }
}]);

// Create WebSocket client
const wsClient = new SubscriptionClient(wsUri, {
    reconnect: true,
    connectionParams: {
       jwt: token
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
