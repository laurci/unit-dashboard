import { pubsub } from '@lib/pubsub';

export type Context = {
  authToken?: string;
  pubsub: typeof pubsub;
};
