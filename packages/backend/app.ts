import { ApolloServer, ApolloServerPlugin } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { createApplication } from '@baeta/core';
import { env } from '@lib/env';
import { pubsub } from '@lib/pubsub';
import { modules } from '@modules/autoload';
import { Context } from '@typings/context';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import fs from 'fs/promises';
import { printSchema } from 'graphql';
import { useServer } from 'graphql-ws/lib/use/ws';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';

const baeta = createApplication({
  modules,
  pruneSchema: true,
});

if (!env.production) {
  fs.writeFile('./schema.graphql', printSchema(baeta.schema));
}
const app = express();
const httpServer = createServer(app);

const ws = new WebSocketServer({
  path: '/graphql',
  server: httpServer,
});

const cleanup = useServer({ schema: baeta.schema }, ws);

const httpDrainPlugin = ApolloServerPluginDrainHttpServer({ httpServer });

const wsDrainPlugin: ApolloServerPlugin = {
  async serverWillStart() {
    return {
      async drainServer() {
        await cleanup.dispose();
      },
    };
  },
};

const apollo = new ApolloServer<Context>({
  schema: baeta.schema,
  plugins: [httpDrainPlugin, wsDrainPlugin],
});

await apollo.start();

const apolloMiddleware = expressMiddleware(apollo, {
  context: async ({ req }) => {
    return {
      authToken: req.headers.authorization,
      pubsub,
    };
  },
});

app.use(
  '/graphql',
  cors<cors.CorsRequest>({
    origin: ['https://demo-dashboard.unit.planck.ws'],
  }),
  bodyParser.json(),
  apolloMiddleware
);

await new Promise<void>((resolve) => httpServer.listen({ port: env.port }, resolve));

console.log(`🚀 Server ready at http://localhost:${env.port}/graphql`);
