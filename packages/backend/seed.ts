import { LogType, MessageDirection, Prisma, prisma } from '@lib/prisma';
import {
  randBoolean,
  randDomainName,
  randLine,
  randNumber,
  randPastDate,
  randPhrase,
  randUserName,
  randUuid,
} from '@ngneat/falso';

const clientsIdx = Array.from({ length: 25 }, (_, i) => i + 1);
const logsIdx = Array.from({ length: 25 }, (_, i) => i + 1);

const messageDirection = Object.values(MessageDirection);
const logType = Object.values(LogType);

function createRandomIndex(length: number) {
  return randNumber({
    min: 0,
    max: length - 1,
  });
}

function createRandomClient(): Prisma.ClientCreateArgs {
  const messagesLength = randNumber({
    min: 0,
    max: 100,
  });

  const logsLength = randNumber({
    min: 0,
    max: 100,
  });

  const messagesIdx = Array.from({ length: messagesLength }, (_, i) => i + 1);
  const logsIdx = Array.from({ length: logsLength }, (_, i) => i + 1);

  return {
    data: {
      name: randUuid(),
      appName: randDomainName(),
      connected: randBoolean(),
      lastSeen: randPastDate(),
      messages: {
        create: messagesIdx.map(() => createRandomMessage()),
      },
      logs: {
        create: logsIdx.map(() => createRandomLog()),
      },
    },
  };
}

function createRandomMessage(): Prisma.MessageCreateWithoutClientInput {
  const directionIdx = createRandomIndex(messageDirection.length);
  return {
    value: randUserName(),
    direction: messageDirection[directionIdx],
  };
}

function createRandomLog(): Prisma.LogCreateWithoutClientInput {
  const logTypeIdx = createRandomIndex(logType.length);

  return {
    title: randPhrase({ length: 1 })[0],
    description: randLine({ length: 4 }).join('\n'),
    type: logType[logTypeIdx],
  };
}

const clientsCreate = clientsIdx.map(() => createRandomClient());
const logsCreate = logsIdx.map(() => createRandomLog());

const clientsCreatePromises = clientsCreate.map(async (client) => {
  return prisma.client.create(client);
});

await Promise.all(clientsCreatePromises);

await prisma.log.createMany({
  data: logsCreate,
});
