import { Layout } from '@components/layout';
import { createRoute } from '@lib/route';
import { lazy } from 'react';

export const logsRoute = createRoute({
  element: lazy(() => import('./logs')),
  path: '/logs',
  createWrapper: (child) => {
    return <Layout>{child}</Layout>;
  },
});
