import { prisma } from '@lib/prisma';
import { getMessageModule } from './typedef';

const { Client, Message, Query } = getMessageModule();

Client.messages(async ({ root }) => {
  return prisma.client
    .findUnique({
      where: {
        id: root.id,
      },
    })
    .messages({
      orderBy: {
        createdAt: 'desc',
      },
    });
});

Message.client(({ root }) => {
  return prisma.message
    .findUnique({
      where: {
        id: root.id,
      },
    })
    .client();
});

Query.message(({ args }) => {
  return prisma.message.findUnique({
    where: {
      id: args.where.id,
    },
  });
});

Query.messages(({ args }) => {
  return prisma.message.findMany({
    where: {
      clientId: args?.where?.clientId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
});
