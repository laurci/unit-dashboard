import { setContext } from '@apollo/client/link/context';
import { auth } from '@lib/auth';

export const authLink = setContext((_, { headers }) => {
  const token = auth.getToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
