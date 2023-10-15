import { Redis } from 'ioredis';
import { env } from '@lib/env';

export const redis = new Redis(`${env.redisUrl}/0`, {});
export const publisher = new Redis(`${env.redisUrl}/0`, {});
export const subscriber = new Redis(`${env.redisUrl}/0`, {});
