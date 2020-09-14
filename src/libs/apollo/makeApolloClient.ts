import { ApolloClient, HttpLink, split, NormalizedCacheObject, gql } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

import { cache } from './cache';

export const typeDefs = gql`
  extend type Query {
    isSomething: Boolean!
  }
`;

const makeApolloClient = (token: string) => {
  // create an apollo link instance, a network interface for apollo client
  const httpLink = new HttpLink({
    uri: `https://next-expo-twitter-clone.herokuapp.com/v1/graphql`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // create an apollo link instance, a network interface for apollo client
  const wsLink = new WebSocketLink({
    uri: `wss://next-expo-twitter-clone.herokuapp.com/v1/graphql`,
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    },
  });

  // The split function takes three parameters:
  //
  // * A function that's called for each operation to execute
  // * The Link to use for an operation if the function returns a "truthy" value
  // * The Link to use for an operation if the function returns a "falsy" value
  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink
  );

  // instantiate apollo client with apollo link instance and cache instance
  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link,
    cache,
    typeDefs,
  });
  return client;
};
export default makeApolloClient;
