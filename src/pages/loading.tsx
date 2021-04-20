import * as React from 'react'

import { FirebaseProvider } from '../contexts/firebase'
import { InitialLoading } from '../components/Loading'
import { VerifiedContextProvider } from '../contexts/verified'

const LoadingPage = () => {
  return (
    <FirebaseProvider>
      <VerifiedContextProvider>
        <InitialLoading />
      </VerifiedContextProvider>
    </FirebaseProvider>
  )
}

export default LoadingPage
