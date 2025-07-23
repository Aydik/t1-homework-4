import type { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

const routeConfig: RouteObject[] = [
  {
    path: '/',
    element: <div>1234</div>,
  },
];

export const AppRouter: FC = () => useRoutes(routeConfig);
