import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { env } from '@lib/env/env';
import { authLink } from './apollo-auth';
import { createHttpWsLink } from './apollo-http-ws';
import { WebSocketLink } from './apollo-ws';

const httpLink = new HttpLink({
  uri: env.apiUrl,
  credentials: 'include',
});

const wsLink = new WebSocketLink({
  url: env.wsUrl,
});

const httpWslink = createHttpWsLink(httpLink, wsLink);

export const apollo = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authLink, httpWslink]),
});
