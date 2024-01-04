import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { App } from '../components/app';
import { Login } from '../components/login';
import { NotFound } from '../components/not-found/NotFound';
import { TodolistsList } from '../components/todolistsList';
import { ROUTERS } from '../constants/constants';

export const router = createBrowserRouter([
  {
    path: ROUTERS.TODOLISTS,
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: ROUTERS.TODOLISTS,
        element: <TodolistsList />,
      },
      {
        path: ROUTERS.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTERS.NOTFOUND,
        element: <NotFound />,
      },
    ],
  },
]);
