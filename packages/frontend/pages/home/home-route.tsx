import { Layout } from '@components/layout';
import { createRoute } from '@lib/route';
import { lazy } from 'react';

export const homeRoute = createRoute({
  element: lazy(() => import('./home')),
  index: true,
  createWrapper: (child) => {
    return <Layout>{child}</Layout>;
  },
});
