import ApolloClient, { createNetworkInterface } from 'apollo-client';
import {SubscriptionClient, addGraphQLSubscriptions} from 'subscriptions-transport-ws';

const GRAPHQL_ENDPOINT = 'ws://localhost:3000/graphql';

const wsClient = new SubscriptionClient(GRAPHQL_ENDPOINT, {
  reconnect: true,
});

const networkInterface = createNetworkInterface({
    uri: '/graphql',
    opts: {
      // Additional fetch options like `credentials` or `headers`
      credentials: 'include',
    }
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient
);

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  queryDeduplication: true,
  reduxRootSelector: state => state.apollo,
});

export default function createApolloClient() {
  return client;
}
