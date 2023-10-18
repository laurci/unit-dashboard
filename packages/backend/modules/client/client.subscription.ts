import { pubsub } from '@lib/pubsub';
import { Client, getClientModule } from './typedef';

const { Mutation, Subscription } = getClientModule();

Mutation.clientConnected.$use(async (params, next) => {
  const result = await next();
  pubsub.publish('client-connected', result);
  return result;
});

Mutation.clientDisconnected.$use(async (params, next) => {
  const result = await next();
  pubsub.publish('client-disconnected', result);
  return result;
});

Mutation.clientCreate.$use(async (params, next) => {
  const result = await next();
  pubsub.publish('client-created', result);
  return result;
});

Subscription.clientConnected<Client>({
  subscribe() {
    return pubsub.asyncIterator('client-connected');
  },
  resolve(params) {
    return params.payload;
  },
});

Subscription.clientDisconnected<Client>({
  subscribe() {
    return pubsub.asyncIterator('client-disconnected');
  },
  resolve(params) {
    return params.payload;
  },
});

Subscription.clientCreated<Client>({
  subscribe() {
    return pubsub.asyncIterator('client-created');
  },
  resolve(params) {
    console.log('params');
    return params.payload;
  },
});
