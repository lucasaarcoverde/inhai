import * as React from 'react'
import { FirebaseProvider } from '../contexts/firebase'

import { InitialLoading } from '../components/Loading'

const LoadingPage = () => {
  return (
    <FirebaseProvider>
      <InitialLoading />
    </FirebaseProvider>
  )
}

export default LoadingPage
