import React from 'react';
import { createHashRouter } from 'react-router-dom';
import { App } from '../App';
import { Home } from '../pages/home/Home';
import { ProtectedRoutes } from './ProtectedRoutes';
import { Registration } from '../pages/registration/Registration';
import { User } from '../pages/user/User';
import { UserIdDisplay } from '../pages/user/UserIdDisplay/UserIdDisplay';
import { Dashboard } from '../pages/user/UserIdDashboard/Dashboard/Dashboard';
import { Rewards } from '../pages/user/UserIdDashboard/Rewards/Rewards';
import { Teams } from '../pages/user/UserIdDashboard/Teams/Teams';
import { Transactions } from '../pages/user/UserIdDashboard/Transactions/Transactions';
import { UserIdDashboard } from '../pages/user/UserIdDashboard/UserIdDashboard';

export const NavigationRoutes = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: 'register',
        element: (
          <ProtectedRoutes>
            <Registration></Registration>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'user',
        element: (
          <ProtectedRoutes>
            <User></User>
          </ProtectedRoutes>
        ),
        children: [
          {
            index: true,
            element: <UserIdDisplay></UserIdDisplay>,
          },
          {
            path: 'userIdDisplay/:userAddress',
            element: <UserIdDisplay></UserIdDisplay>,
          },
          {
            path: 'userIdDashboard/:userId',
            element: <UserIdDashboard />,
            children: [
              {
                index: true,
                element: <Dashboard></Dashboard>,
              },
              {
                path: 'dashboard',
                element: <Dashboard></Dashboard>,
              },
              {
                path: 'rewards',
                element: <Rewards></Rewards>,
              },
              {
                path: 'teams',
                element: <Teams></Teams>,
              },
              {
                path: 'transactions',
                element: <Transactions></Transactions>,
              },
            ],
          },
        ],
      },
    ],
  },
]);
