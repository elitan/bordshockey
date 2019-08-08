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


// create the web socket link
const wsLink = new WebSocketLink({
  uri: wsurl,
  options: {
    reconnect: true,
    connectionParams: () => {
      const jwt_token = nhost.getJWTToken();

      let auth_headers = {
      };

      if (jwt_token) {
        console.log('jwt token set:');
        console.log({jwt_token});
        auth_headers.authorization = `Bearer ${jwt_token}`;
      }

      console.log({auth_headers});

      return {
        headers: auth_headers,
      };
    },
  },
});

let httpLink = new HttpLink({
  uri: httpurl,
});

const authLink = setContext((a, { headers }) => {
  const jwt_token = nhost.getJWTToken();

  let auth_headers = {
    ...headers,
  };

  if (jwt_token) {
    console.log('jwt token set:');
    console.log({jwt_token});
    auth_headers.authorization = `Bearer ${jwt_token}`;
  }

  console.log({auth_headers});

  return {
    headers: auth_headers,
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

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});

export default client;
