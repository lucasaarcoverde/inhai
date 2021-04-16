import * as React from 'react'
import { FirebaseProvider, useAuth } from '../contexts/firebase'

import { InitialLoading } from '../components/Loading'
import { navigate } from 'gatsby'
import { VerifiedContextProvider } from '../contexts/verified'

const LoadingPage = () => {
  const [loading, setLoading] = React.useState(true)

  const { firebase } = useAuth()

  React.useEffect(() => {
    if (!loading) {
      navigate('/login')
    }
  }, [loading])

  React.useEffect(() => {
    const loadingTimer = setTimeout(() => setLoading(false), 15000)

    firebase.auth().onAuthStateChanged((authUser) => {
      if (!authUser) return

      const navigateTimer = setTimeout(() => navigate('/app'), 1000)

      return () => {
        clearTimeout(navigateTimer)
      }
    })

    return () => {
      clearTimeout(loadingTimer)
    }
  }, [firebase])

  return (
    <FirebaseProvider>
      <VerifiedContextProvider>
        <InitialLoading />
      </VerifiedContextProvider>
    </FirebaseProvider>
  )
}

export default LoadingPage
