import type { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { LoginPage } from 'pages/LoginPage';

const routeConfig: RouteObject[] = [
  {
    path: '/',
    element: <div>1234</div>,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
];

export const AppRouter: FC = () => useRoutes(routeConfig);
