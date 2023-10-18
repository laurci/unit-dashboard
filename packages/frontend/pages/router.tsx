import { createBrowserRouter } from 'react-router-dom';
import { notFoundRoute } from './404/404-route';
import { clientRoute } from './client/client-route';
import { homeRoute } from './home/home-route';
import { logsRoute } from './logs/logs-route';
import { messagesRoute } from './messages/messages-route';

export const router = createBrowserRouter([
  homeRoute.build(),
  logsRoute.build(),
  messagesRoute.build(),
  clientRoute.build(),
  notFoundRoute.build(),
]);
