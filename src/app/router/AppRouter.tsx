import type { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { LoginPage } from 'pages/LoginPage';
import { MainLayout } from 'app/layout/MainLayout';
import { IndexPage } from 'pages/IndexPage';
import { UserPage } from 'pages/UserPage';

const routeConfig: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <IndexPage />,
      },
      {
        path: '/user/:id',
        element: <UserPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
];

export const AppRouter: FC = () => useRoutes(routeConfig);
