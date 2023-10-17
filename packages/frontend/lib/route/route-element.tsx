import { RouteLazy } from '@lib/route/route-lazy';
import { LazyExoticComponent, ReactNode } from 'react';

export type RouteElement = (() => JSX.Element) | LazyExoticComponent<() => JSX.Element> | null;

export type CreateWrapper = (child: ReactNode) => ReactNode;

export function createRouteElement(
  Child: RouteElement,
  fallback?: NonNullable<ReactNode>,
  createWrapper?: CreateWrapper
) {
  let loadable = null;

  if (Child != null) {
    loadable = <RouteLazy element={<Child />} fallback={fallback} />;
  }

  return createWrapper?.(loadable) ?? loadable;
}
