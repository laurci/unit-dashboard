import { Layout } from '@components/layout';
import { createRoute } from '@lib/route';
import { lazy } from 'react';

export const messagesRoute = createRoute({
  element: lazy(() => import('./messages')),
  path: '/messages',
  createWrapper: (child) => {
    return <Layout>{child}</Layout>;
  },
});
