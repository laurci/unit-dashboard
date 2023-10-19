import { ApolloProvider } from '@apollo/client';
import { Loading } from '@components/loading';
import { apollo } from '@lib/apollo/apollo';
import { RouterProvider } from 'react-router-dom';
import { LoginProvider } from './login';
import { router } from './router';

export function App() {
  return (
    <ApolloProvider client={apollo}>
      <LoginProvider>
        <RouterProvider router={router} fallbackElement={<Loading />} />
      </LoginProvider>
    </ApolloProvider>
  );
}
