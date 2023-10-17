import { ReactNode } from 'react';
import { IndexRouteObject, NonIndexRouteObject, RouteObject, useParams } from 'react-router-dom';
import { CreateWrapper, RouteElement, createRouteElement } from './route-element';
import { HookPathParams, UrlPathParams, buildPath } from './route-path';

export type RoutePath<T extends Record<string, string> | undefined = undefined> =
  | string
  | ((params: T) => string);

type IndexRouteOptions = Omit<IndexRouteObject, 'element'> & {
  element: RouteElement;
  fallback?: NonNullable<ReactNode>;
  createWrapper?: CreateWrapper;
};

type NonIndexRouteOptions<T extends string> = Omit<NonIndexRouteObject, 'element'> & {
  element: RouteElement;
  fallback?: NonNullable<ReactNode>;
  children?: RouteObject[];
  createWrapper?: CreateWrapper;
  path: T;
};

export type RouteOptions<T extends string> = IndexRouteOptions | NonIndexRouteOptions<T>;

export function createRoute<T extends string>(options: RouteOptions<T>) {
  const { element, fallback, createWrapper, path, ...rest } = options;

  const build = (): RouteObject => {
    return {
      ...rest,
      path,
      element: createRouteElement(element, fallback, createWrapper),
    };
  };

  const url = (params: UrlPathParams<T>) => {
    return buildPath(path, params);
  };

  return {
    url,
    build,
    useParams: useParams<HookPathParams<T>>,
  };
}
