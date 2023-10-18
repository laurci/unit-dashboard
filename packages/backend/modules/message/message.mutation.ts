import { prisma } from '@lib/prisma';
import { getMessageModule } from './typedef';

const { Mutation } = getMessageModule();

Mutation.createMessage(({ args }) => {
  return prisma.message.create({
    data: {
      value: args.data.value,
      clientId: args.data.clientId,
      direction: args.data.direction,
    },
  });
});
