import { Layout } from '@components/layout';
import { createRoute } from '@lib/route';
import { lazy } from 'react';

export const clientRoute = createRoute({
  element: lazy(() => import('./client')),
  path: '/client/:id',
  createWrapper: (child) => {
    return <Layout>{child}</Layout>;
  },
});
