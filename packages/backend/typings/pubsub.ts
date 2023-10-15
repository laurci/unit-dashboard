import { RedisPubSub } from 'graphql-redis-subscriptions';

type Publish<Subscriptions extends Record<string, any>> = <
  C extends keyof Subscriptions,
  P extends Subscriptions[C]
>(
  channel: C,
  payload: P
) => Promise<void>;

type Subscribe<Subscriptions extends Record<string, any>> = <
  C extends keyof Subscriptions,
  P extends Subscriptions[C]
>(
  channel: C,
  onMessage: (payload: P) => Promise<void> | void
) => Promise<number>;

export interface PubSub<Subscriptions extends Record<string, any>> extends RedisPubSub {
  publish: Publish<Subscriptions>;
  subscribe: Subscribe<Subscriptions>;
}
