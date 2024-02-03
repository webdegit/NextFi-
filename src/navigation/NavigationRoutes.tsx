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
            path: 'dashboard/:userId',
            element: <Dashboard></Dashboard>,
          },
          {
            path: 'rewards/:userId',
            element: <Rewards></Rewards>,
          },
          {
            path: 'teams/:userId',
            element: <Teams></Teams>,
          },
          {
            path: 'transactions/:userId',
            element: <Transactions></Transactions>,
          },
        ],
      },
    ],
  },
]);
