import { prisma } from '@lib/prisma';
import { getLogModule } from './typedef';

const { Mutation } = getLogModule();

Mutation.logCreate(({ args }) => {
  return prisma.log.create({
    data: {
      title: args.data.title,
      description: args.data.description,
      type: args.data.type,
      clientId: args.data.clientId,
    },
  });
});
