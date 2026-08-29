import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router";
import App from './App'
import UsersPage from './UsersPage'

const AppRoute = () => {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />
        },

        {
            path: '/users',
            element: <UsersPage />
        }
    ])
  return <RouterProvider router={router} />
}

export default AppRoute