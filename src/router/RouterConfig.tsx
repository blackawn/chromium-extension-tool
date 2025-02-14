import { createHashRouter, Navigate } from 'react-router-dom'
import { lazy } from 'react'
import Home from '@/pages/Home'
import RouterGuard from './RouterGuard'

const LazyLayout = lazy(() => import('@/layout'))

const Config = createHashRouter([
  {
    path: '/',
    element: <Navigate
      to='/layout/home'
    />,
  },
  {
    path: '/',
    element: <RouterGuard />,
    children: [
      {
        path: 'layout',
        element: <LazyLayout />,
        children: [
          {
            path: 'home',
            element: <Home />
          }
        ]
      }
    ]
  }
])

export default Config