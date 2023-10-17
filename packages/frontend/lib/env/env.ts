import { createEnvParam } from '@utils/env';

export const env = {
  development: createEnvParam('NODE_ENV', {
    type: 'boolean',
    resolver: (value) => value !== 'production',
  }),

  apiUrl: createEnvParam<string>('VITE_API_URL', {
    type: 'string',
    required: true,
  }),

  wsUrl: createEnvParam<string>('VITE_WS_URL', {
    type: 'string',
    required: true,
  }),
};
