export interface EnvOptions<T extends string | number | boolean> {
  default?: T;
  required?: boolean;
  type: EnvType<T>;
  resolver?: (value: string) => T;
}

type EnvType<T extends string | number | boolean> = T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : T extends boolean
  ? 'boolean'
  : never;

function resolveString(value: string) {
  return value;
}

function resolveNumber(value: string) {
  return Number(value);
}

function resolveBoolean(value: string) {
  return value === 'true';
}

export function resolveParam<T extends string | number | boolean>(
  key: string,
  options: EnvOptions<T>,
  map: Record<string, string | undefined>
) {
  const rawValue = map[key];

  if (!rawValue) {
    return options.default;
  }

  if (options.type === 'number') {
    if (options.resolver) {
      return options.resolver(rawValue);
    }
    return resolveNumber(rawValue);
  }

  if (options.type === 'boolean') {
    if (options.resolver) {
      return options.resolver(rawValue);
    }
    return resolveBoolean(rawValue);
  }

  if (options.type === 'string') {
    if (options.resolver) {
      return options.resolver(rawValue);
    }
    return resolveString(rawValue);
  }

  throw new Error(
    `Cannot resolve env param '${key}'. Unknown type ${options.type}. Type must be Number, Boolean or String!`
  );
}

export function validateValue<T extends string | number | boolean>(
  key: string,
  value: string | number | boolean | undefined,
  options: EnvOptions<T>
) {
  if (value == null && options.required !== true) {
    return;
  }

  if (value == null && options.required === true) {
    throw new Error(`Env param '${key}' is required and doesn't have a default value!`);
  }

  if (typeof value !== options.type?.toLowerCase()) {
    if (options.resolver) {
      throw new Error(
        `Return type of custom resolver not matching type of property for key '${key}'. Expected '${options.type?.toLowerCase()}' but got '${typeof value}'`
      );
    } else {
      throw new Error(
        `Type mismatch for property with key '${key}'. Expected '${options.type?.toLowerCase()}' but got '${typeof value}'.`
      );
    }
  }
}
