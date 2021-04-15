import * as React from 'react'

import { navigate } from 'gatsby'
import { useAuth } from '../contexts/firebase'

interface PrivateRouteProps {
  path: string
}

interface Role {
  role: string
}

const OwnerRoute: React.FC<PrivateRouteProps> = ({ children, path }) => {
  const { user, firebase } = useAuth()
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!user) return

    const rolesRef = firebase.firestore().collection('roles')
    console.log(user)
    rolesRef
      .doc(user?.id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const { role } = doc.data() as Role
          if (role === 'owner') return setLoading(false)
        } else {
          return navigate(path)
        }
      })
      .catch(() => {
        navigate(path)
      })
  }, [user])

  return <>{!loading && children}</>
}

export default OwnerRoute
