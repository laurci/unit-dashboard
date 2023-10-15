import { pubsub } from '@lib/pubsub';

export type Context = {
  userId?: string;
  pubsub: typeof pubsub;
};
