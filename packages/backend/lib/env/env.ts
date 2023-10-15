import { createEnvParam } from '../../utils/env';

export const env = {
  databaseUrl: createEnvParam<string>('DATABASE_URL', {
    required: true,
    type: 'string',
  }),

  redisUrl: createEnvParam<string>('REDIS_URL', {
    required: true,
    type: 'string',
  }),

  port: createEnvParam<number>('NODE_PORT', {
    required: true,
    type: 'number',
  }),

  production: createEnvParam<boolean>('NODE_ENV', {
    required: true,
    type: 'boolean',
    resolver(value) {
      return value === 'production';
    },
  }),
};

