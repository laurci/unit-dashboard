import { Layout } from '@components/layout';
import { createRoute } from '@lib/route';
import { lazy } from 'react';

export const notFoundRoute = createRoute({
  element: lazy(() => import('./404')),
  path: '*',
  createWrapper: (child) => {
    return <Layout>{child}</Layout>;
  },
});
