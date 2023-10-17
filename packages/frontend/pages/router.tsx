import { createBrowserRouter } from 'react-router-dom';
import { homeRoute } from './home/home-route';
import { logsRoute } from './logs/logs-route';
import { messagesRoute } from './messages/messages-route';

export const router = createBrowserRouter([
  homeRoute.build(),
  logsRoute.build(),
  messagesRoute.build(),
]);
