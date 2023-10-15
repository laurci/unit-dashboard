import { prisma } from '@lib/prisma';
import { getLogModule } from './typedef';

const { Query, Client } = getLogModule();

Query.logs(({ args }) => {
  return prisma.log.findMany({
    where: {
      clientId: args?.where?.clientId,
    },
  });
});

Query.log(({ args }) => {
  return prisma.log.findUnique({
    where: {
      id: args.where.id,
    },
  });
});

Client.logs(({ root }) => {
  return prisma.client
    .findUnique({
      where: {
        id: root.id,
      },
    })
    .logs();
});
