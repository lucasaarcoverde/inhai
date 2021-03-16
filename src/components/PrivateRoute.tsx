// PrivateRoute.tsx

import * as React from 'react'

import { navigate } from 'gatsby'
import { useAuth } from '../contexts/firebase'

interface PrivateRouteProps {
  path: string
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, path }) => {
  const { authToken } = useAuth()

  if (!authToken && window.location.href !== path) {
    navigate(path)
    return null
  }

  return <>{children}</>
}

export default PrivateRoute
