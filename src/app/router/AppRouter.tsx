import type { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { LoginPage } from 'pages/LoginPage';
import { MainLayout } from 'app/layout/MainLayout';
import { IndexPage } from 'pages/IndexPage';

const routeConfig: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <IndexPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
];

export const AppRouter: FC = () => useRoutes(routeConfig);
