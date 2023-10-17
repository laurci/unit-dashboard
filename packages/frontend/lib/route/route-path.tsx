export type ParsePathParams<T extends string> = Split<T>[number] extends infer U
  ? U extends `:${infer V}`
    ? V
    : never
  : never;

export type Split<S, TIncludeTrailingSlash = true> = S extends unknown
  ? string extends S
    ? string[]
    : S extends string
    ? CleanPath<S> extends ''
      ? []
      : TIncludeTrailingSlash extends true
      ? CleanPath<S> extends `${infer T}/`
        ? [...Split<T>, '/']
        : CleanPath<S> extends `/${infer U}`
        ? Split<U>
        : CleanPath<S> extends `${infer T}/${infer U}`
        ? [...Split<T>, ...Split<U>]
        : [S]
      : CleanPath<S> extends `${infer T}/${infer U}`
      ? [...Split<T>, ...Split<U>]
      : S extends string
      ? [S]
      : never
    : never
  : never;

type CleanPath<T extends string> = T extends `${infer L}//${infer R}`
  ? CleanPath<`${CleanPath<L>}/${CleanPath<R>}`>
  : T extends `${infer L}//`
  ? `${CleanPath<L>}/`
  : T extends `//${infer L}`
  ? `/${CleanPath<L>}`
  : T;

export type HookPathParams<T extends string> = ParsePathParams<T> extends never
  ? Record<string, never>
  : Record<ParsePathParams<T>, string>;

export type UrlPathParams<T extends string> = ParsePathParams<T> extends never
  ? void
  : Record<ParsePathParams<T>, string>;

export function buildPath(url?: string, params?: Record<string, string> | void) {
  if (url == null) {
    return '/';
  }

  if (params == null) {
    return url;
  }

  let builtPath = url;

  for (const key in params) {
    if (!Object.prototype.hasOwnProperty.call(params, key)) {
      continue;
    }
    const value = params[key];
    const matcher = `:${key}`;
    builtPath = builtPath.replace(matcher, value);
  }

  return builtPath;
}
