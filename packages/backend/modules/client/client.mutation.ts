import { prisma } from '@lib/prisma';
import { getClientModule } from './typedef';

const { Mutation } = getClientModule();

Mutation.clientConnected(({ args }) => {
  return prisma.client.update({
    where: {
      id: args.id,
    },
    data: {
      connected: true,
      lastSeen: new Date(),
    },
  });
});

Mutation.clientDisconnected(({ args }) => {
  return prisma.client.update({
    where: {
      id: args.id,
    },
    data: {
      connected: false,
      lastSeen: new Date(),
    },
  });
});

Mutation.clientCreate(({ args }) => {
  return prisma.client.create({
    data: {
      name: args.data.name,
      connected: args.data.connected,
    },
  });
});
