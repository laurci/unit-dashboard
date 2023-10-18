import { prisma } from '@lib/prisma';
import { getMessageModule } from './typedef';

const { Client, Message } = getMessageModule();

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
