// PrivateRoute.tsx

import * as React from 'react'

import { navigate } from 'gatsby'
import { useAuth } from '../contexts/firebase'
import { useLocation } from '@reach/router'

interface PrivateRouteProps {
  path: string
}

const isBrowser = () => typeof window !== 'undefined'

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, path }) => {
  const { authToken } = useAuth()
  const { pathname } = useLocation()

  if (isBrowser() && !authToken && pathname !== path) {
    navigate(path)
    return null
  }

  return <>{children}</>
}

export default PrivateRoute
