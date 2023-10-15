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
import { useServer } from 'graphql-ws/lib/use/ws';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';

const baeta = createApplication({
  modules,
  pruneSchema: true,
});

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
      pubsub,
    };
  },
});

app.use('/graphql', cors<cors.CorsRequest>(), bodyParser.json(), apolloMiddleware);

await new Promise<void>((resolve) => httpServer.listen({ port: env.port }, resolve));

console.log(`🚀 Server ready at http://localhost:${env.port}/graphql`);
