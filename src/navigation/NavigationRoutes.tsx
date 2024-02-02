import React from 'react';
import { createHashRouter } from 'react-router-dom';
import { App } from '../App';
import { Home } from '../pages/home/Home';
import { ProtectedRoutes } from './ProtectedRoutes';
import { Registration } from '../pages/registration/Registration';

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
    ],
  },
]);
