import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { auth } from '@lib/auth';
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
  shouldRetry: () => true,
  retryAttempts: 10,
  retryWait(retries) {
    return new Promise((resolve) => {
      setInterval(() => {
        const token = auth.getToken();

        if (!token) {
          return;
        }

        resolve();
      }, 50);
    });
  },
  connectionParams() {
    const token = auth.getToken();
    return {
      authorization: token ? `Bearer ${token}` : undefined,
    };
  },
});

const httpWslink = createHttpWsLink(httpLink, wsLink);

export const apollo = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authLink, httpWslink]),
});
