import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router'
import RegisterPage from '../../features/auth/ui/pages/RegisterPage'
import ProfilePage from '../../features/auth/ui/pages/ProfilePage'

const AppRoute = () => {

    const router = createBrowserRouter([
        {
            path: '/register',
            element: <RegisterPage />
        },
        {
            path: '/profile',
            element: <ProfilePage />
        }
    ])

  return <RouterProvider router={router} />
}

export default AppRoute