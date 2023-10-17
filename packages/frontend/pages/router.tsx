import { createBrowserRouter } from 'react-router-dom';
import { homeRoute } from './home/home-route';

export const router = createBrowserRouter([
  homeRoute.build(),
  //   homeIdRoute.build(),
  //   userRoute.build(),
]);

