// PrivateRoute.tsx

import * as React from 'react'

import { navigate } from 'gatsby'
import { useAuth } from '../contexts/firebase'

interface PrivateRouteProps {
  path: string
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, path }) => {
  const { firebase } = useAuth()
  const [loading, setLoading] = React.useState(true)

  firebase.auth().onAuthStateChanged((authUser) => {
    if (authUser) {
      setLoading(false)
    } else {
      console.log('not logged')
      navigate(path)
    }
  })

  return <>{!loading && children}</>
}

export default PrivateRoute
