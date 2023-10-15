import { prisma } from '@lib/prisma';
import { getClientModule } from './typedef';

const { Query } = getClientModule();

Query.clients(({ args }) => {
  return prisma.client.findMany({
    where: {
      connected: args?.where?.connected,
    },
  });
});

Query.client(({ args }) => {
  return prisma.client.findUnique({
    where: {
      id: args.where.id,
    },
  });
});
