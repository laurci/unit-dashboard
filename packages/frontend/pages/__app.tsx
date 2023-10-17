import { ApolloProvider } from '@apollo/client';
import { apollo } from '@lib/apollo/apollo';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export function App() {
  return (
    <ApolloProvider client={apollo}>
      <RouterProvider router={router} fallbackElement={<>Loading...</>} />
    </ApolloProvider>
  );
}
