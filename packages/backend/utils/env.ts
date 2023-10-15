import { EnvOptions, resolveParam, validateValue } from "@unit/common";

export function createEnvParam<T extends number | boolean | string>(
	key: string,
	options: EnvOptions<T>
) {
	const value = resolveParam(key, options, process.env);
	validateValue(key, value, options);
	return value as T;
}