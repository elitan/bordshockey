import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import nhost from '../nhost';

const wsurl = `wss://hasura-yi8ci911.nhost.io/v1/graphql`;
const httpurl = `https://hasura-yi8ci911.nhost.io/v1/graphql`;

const wsLink = new WebSocketLink({
  uri: wsurl,
  options: {
    reconnect: true,
    timeout: 30000,
    connectionParams: () => {
      const jwt_token = nhost.getJWTToken();
      return {
        headers: {
          authorization: jwt_token ? `Bearer ${jwt_token}` : '',
        },
      };
    },
  },
});

let httpLink = new HttpLink({
  uri: httpurl,
});

const authLink = setContext((a, { headers }) => {
  const jwt_token = nhost.getJWTToken();
  return {
    headers: {
      ...headers,
      authorization: jwt_token ? `Bearer ${jwt_token}` : '',
    },
  };
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

export default new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});
