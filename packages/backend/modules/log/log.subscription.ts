import { pubsub } from '@lib/pubsub';
import { Log, getLogModule } from './typedef';

const { Mutation, Subscription } = getLogModule();

Mutation.logCreate.$use(async (params, next) => {
  const result = await next();
  pubsub.publish('log-created', result);
  return result;
});

Subscription.logCreated<Log>({
  subscribe() {
    return pubsub.asyncIterator('log-created');
  },
  resolve(params) {
    return params.payload;
  },
});
