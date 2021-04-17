import * as React from 'react'
import { navigate } from 'gatsby'

import { useAuth } from '../contexts/firebase'

interface PrivateRouteProps {
  path: string
}

interface Role {
  role: string
}

const AdminRoute: React.FC<PrivateRouteProps> = ({ children, path }) => {
  const { user, firebase } = useAuth()
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!user) return

    const rolesRef = firebase.firestore().collection('roles')

    rolesRef
      .doc(user?.id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const { role } = doc.data() as Role

          if (role === 'admin') return setLoading(false)
        }

        return navigate(path)
      })
      .catch(() => {
        navigate(path)
      })
  }, [user])

  return <>{!loading && children}</>
}

export default AdminRoute
