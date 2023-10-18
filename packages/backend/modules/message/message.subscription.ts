import { pubsub } from '@lib/pubsub';
import { Message, getMessageModule } from './typedef';

const { Mutation, Subscription } = getMessageModule();

Mutation.createMessage.$use(async (params, next) => {
  const result = await next();
  pubsub.publish('message-created', result);
  return result;
});

Subscription.messageCreated<Message>({
  subscribe() {
    return pubsub.asyncIterator('message-created');
  },
  resolve(params) {
    return params.payload;
  },
});
